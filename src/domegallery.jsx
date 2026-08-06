import { useCallback, useEffect, useMemo, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import "./domegallery.css";

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const normalizeAngle = (d) => ((d % 360) + 360) % 360;

const wrapAngleSigned = (deg) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

const getDataNumber = (el, name, fallback) => {
  const raw = el?.dataset?.[name] ?? el?.getAttribute?.(`data-${name}`);
  const n = raw == null ? NaN : parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided ${pool.length} images, but only ${totalSlots} slots are available. Some images will not be shown.`
    );
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") return { src: image, alt: "MSDI memory" };
    return { src: image.src || "", alt: image.alt || "MSDI memory" };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#000000",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "400px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = false,
  autoRotate = true,
  autoRotateSpeed = 4,
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const originalTilePositionRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);

  const scrollLockedRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(
    () => buildItems(images, segments),
    [images, segments]
  );

  const applyTransform = useCallback((xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);

      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [applyTransform, dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  // Size / radius calculation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;

      let basis;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }

      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));

      root.style.setProperty("--radius", `${radius}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");

      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const frame = frameRef.current;
      if (frame && focusedElRef.current) {
        const enlargedEl = viewerRef.current?.querySelector(".enlarge");
        if (enlargedEl) {
          const rect = frame.getBoundingClientRect();
          const parentRect = viewerRef.current.getBoundingClientRect();
          enlargedEl.style.left = `${rect.left - parentRect.left}px`;
          enlargedEl.style.top = `${rect.top - parentRect.top}px`;
          enlargedEl.style.width = `${rect.width}px`;
          enlargedEl.style.height = `${rect.height}px`;
        }
      }
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [
    applyTransform,
    fit,
    fitBasis,
    grayscale,
    imageBorderRadius,
    maxRadius,
    minRadius,
    openedImageBorderRadius,
    overlayBlurColor,
    padFactor,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  // Idle auto-rotation — keeps drifting unless the user is dragging,
  // coasting on inertia, or has a photo open.
  useEffect(() => {
    if (!autoRotate || autoRotateSpeed === 0) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return;

    let raf = null;
    let last = null;
    let visible = true;

    // Bolanya cuma diputer kalau lagi keliatan. Begitu ke-scroll lewat,
    // loop-nya berhenti total — jadi section di bawahnya ga rebutan sama
    // 3D transform yang masih jalan di belakang layar.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) last = null;
      },
      { threshold: 0 }
    );
    if (rootRef.current) io.observe(rootRef.current);

    const tick = (t) => {
      if (last === null) last = t;
      const dt = Math.min(t - last, 64);
      last = t;

      if (
        visible &&
        !draggingRef.current &&
        !focusedElRef.current &&
        !inertiaRAF.current
      ) {
        const nextY = wrapAngleSigned(
          rotationRef.current.y + (autoRotateSpeed * dt) / 1000
        );
        rotationRef.current = { x: rotationRef.current.x, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [applyTransform, autoRotate, autoRotateSpeed]);

  const stopDrag = useCallback(
    (velocityX, velocityY) => {
      draggingRef.current = false;
      startPosRef.current = null;
      if (Math.abs(velocityX) > 0.005 || Math.abs(velocityY) > 0.005) {
        startInertia(velocityX, velocityY);
      }
    },
    [startInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event;
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = {
          x: evt.clientX ?? evt.touches?.[0]?.clientX ?? 0,
          y: evt.clientY ?? evt.touches?.[0]?.clientY ?? 0,
        };
      },
      onDrag: ({ event, last, velocity: [vx, vy], direction: [dx, dy], movement }) => {
        if (focusedElRef.current || !draggingRef.current) return;

        const evt = event;
        const cx = evt.clientX ?? evt.touches?.[0]?.clientX ?? 0;
        const cy = evt.clientY ?? evt.touches?.[0]?.clientY ?? 0;
        const start = startPosRef.current ?? { x: cx, y: cy };

        const dxTotal = cx - start.x;
        const dyTotal = cy - start.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          const combined = Math.abs(movement[0]) + Math.abs(movement[1]);
          if (combined > 6) cancelTapRef.current = true;
          stopDrag(vx * dx, vy * dy);
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  const openItemFromElement = useCallback(
    (el) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();

      const parent = el.parentElement;
      focusedElRef.current = el;
      el.setAttribute("data-focused", "true");

      const offsetX = getDataNumber(parent, "offsetX", 0);
      const offsetY = getDataNumber(parent, "offsetY", 0);
      const sizeX = getDataNumber(parent, "sizeX", 2);
      const sizeY = getDataNumber(parent, "sizeY", 2);

      const parentRot = computeItemBaseRotation(
        offsetX,
        offsetY,
        sizeX,
        sizeY,
        segments
      );
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;

      parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
      parent.style.setProperty("--rot-x-delta", `${rotX}deg`);

      const refDiv = document.createElement("div");
      refDiv.className = "item__image item__image--reference opacity-0";
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current.getBoundingClientRect();
      const frameR = frameRef.current.getBoundingClientRect();

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      };

      el.style.visibility = "hidden";
      el.style.zIndex = 0;

      const overlay = document.createElement("div");
      overlay.className = "enlarge";
      overlay.style.position = "absolute";
      overlay.style.left = `${frameR.left - mainR.left}px`;
      overlay.style.top = `${frameR.top - mainR.top}px`;
      overlay.style.width = `${frameR.width}px`;
      overlay.style.height = `${frameR.height}px`;
      overlay.style.opacity = "0";
      overlay.style.zIndex = "30";
      overlay.style.willChange = "transform, opacity";
      overlay.style.transformOrigin = "top left";
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;

      const rawSrc =
        parent.dataset.src ||
        el.querySelector("img")?.src ||
        el.style.backgroundImage?.slice(5, -2) ||
        "";
      const img = document.createElement("img");
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current.appendChild(overlay);

      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;
      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`;

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
        rootRef.current?.setAttribute("data-enlarging", "true");
      });

      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = (ev) => {
          if (ev.propertyName !== "transform") return;
          overlay.removeEventListener("transitionend", onFirstEnd);

          const prevTransition = overlay.style.transition;
          overlay.style.transition = "none";
          const rect2 = overlay.getBoundingClientRect();
          overlay.style.transition = prevTransition;

          const targetW = openedImageWidth || `${rect2.width}px`;
          const targetH = openedImageHeight || `${rect2.height}px`;
          const centerX = rect2.left + rect2.width / 2;
          const centerY = rect2.top + rect2.height / 2;

          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;

          requestAnimationFrame(() => {
            overlay.style.left = `${centerX - mainR.left - parseFloat(targetW) / 2}px`;
            overlay.style.top = `${centerY - mainR.top - parseFloat(targetH) / 2}px`;
            overlay.style.width = targetW;
            overlay.style.height = targetH;
          });

          const cleanupResize = () => {
            overlay.removeEventListener("transitionend", cleanupResize);
            openingRef.current = false;
          };
          overlay.addEventListener("transitionend", cleanupResize, { once: true });
        };
        overlay.addEventListener("transitionend", onFirstEnd);
      } else {
        openingRef.current = false;
      }
    },
    [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, segments]
  );

  const closeEnlarged = useCallback(() => {
    const el = focusedElRef.current;
    const overlay = viewerRef.current?.querySelector(".enlarge");
    if (!el || !overlay) return;
    if (performance.now() - openStartedAtRef.current < 250) return;

    const parent = el.parentElement;
    const original = originalTilePositionRef.current;
    const mainR = mainRef.current.getBoundingClientRect();
    const overlayR = overlay.getBoundingClientRect();

    const closing = document.createElement("div");
    closing.className = "enlarge-closing";
    closing.style.position = "absolute";
    closing.style.left = `${overlayR.left - mainR.left}px`;
    closing.style.top = `${overlayR.top - mainR.top}px`;
    closing.style.width = `${overlayR.width}px`;
    closing.style.height = `${overlayR.height}px`;
    closing.style.overflow = "hidden";
    closing.style.borderRadius = openedImageBorderRadius;
    closing.style.zIndex = "9999";
    closing.style.transition = `all ${enlargeTransitionMs}ms ease`;
    closing.style.pointerEvents = "none";

    const clonedImg = overlay.querySelector("img")?.cloneNode(true);
    if (clonedImg) {
      clonedImg.style.width = "100%";
      clonedImg.style.height = "100%";
      clonedImg.style.objectFit = "cover";
      closing.appendChild(clonedImg);
    }

    viewerRef.current.appendChild(closing);
    overlay.remove();
    rootRef.current?.removeAttribute("data-enlarging");

    requestAnimationFrame(() => {
      if (!original) return;
      closing.style.left = `${original.left - mainR.left}px`;
      closing.style.top = `${original.top - mainR.top}px`;
      closing.style.width = `${original.width}px`;
      closing.style.height = `${original.height}px`;
      closing.style.opacity = "0";
      closing.style.borderRadius = imageBorderRadius;
    });

    const finish = () => {
      closing.remove();
      parent?.style.removeProperty("--rot-y-delta");
      parent?.style.removeProperty("--rot-x-delta");
      parent?.querySelector(".item__image--reference")?.remove();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.visibility = "";
          el.style.zIndex = "";
          el.removeAttribute("data-focused");
          el.style.transition = "opacity 300ms ease";
          el.style.opacity = "0";
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            setTimeout(() => {
              el.style.transition = "";
              el.style.opacity = "";
            }, 300);
          });
        });
      });

      focusedElRef.current = null;
      originalTilePositionRef.current = null;
      openingRef.current = false;
      unlockScroll();
    };

    setTimeout(finish, enlargeTransitionMs);
  }, [enlargeTransitionMs, imageBorderRadius, openedImageBorderRadius, unlockScroll]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeEnlarged();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeEnlarged]);

  useEffect(() => {
    return () => {
      stopInertia();
      unlockScroll();
    };
  }, [stopInertia, unlockScroll]);

  // Tiap pointer turun, penanda "udah gerak" direset. Kalau ga direset di sini,
  // nilainya masih kebawa dari gesture sebelumnya — jadi sekali user pernah
  // nge-drag, klik sesudahnya kebaca sebagai drag terus.
  const onTilePointerDown = useCallback(() => {
    movedRef.current = false;
    cancelTapRef.current = false;
  }, []);

  // Bukanya lewat pointerup, bukan click. Dua alasannya:
  //   1. Bola ini muter sendiri (autoRotate). Kalau pakai click, browser nunggu
  //      pointerdown & pointerup jatuh di elemen yang sama — pas bolanya geser
  //      dikit di antara keduanya, target click-nya naik ke .sphere dan kartunya
  //      ga kebuka sama sekali.
  //   2. pointerup jalan di mouse & sentuh sekaligus, jadi ga perlu dua jalur
  //      yang logikanya nyaris sama.
  const onTileActivate = useCallback(
    (e) => {
      if (draggingRef.current || movedRef.current || cancelTapRef.current) return;
      if (openingRef.current || focusedElRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [openItemFromElement]
  );

  // role="button" + tabIndex butuh jalur keyboard sendiri, soalnya handler
  // click-nya udah ga ada.
  const onTileKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (openingRef.current || focusedElRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [openItemFromElement]
  );

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        "--segments-x": segments,
        "--segments-y": segments,
        "--overlay-blur-color": overlayBlurColor,
        "--tile-radius": imageBorderRadius,
        "--enlarge-radius": openedImageBorderRadius,
        "--image-filter": grayscale ? "grayscale(1)" : "none",
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  "--offset-x": it.x,
                  "--offset-y": it.y,
                  "--item-size-x": it.sizeX,
                  "--item-size-y": it.sizeY,
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || "Open image"}
                  onPointerDown={onTilePointerDown}
                  onPointerUp={onTileActivate}
                  onKeyDown={onTileKeyDown}
                >
                  {/* Semua kotak teknisnya ada di dalam layar (cuma diputer
                      ke belakang bola), jadi loading="lazy" ga ngefek apa-apa.
                      decoding="async" yang nolongin: browser boleh nunda
                      ngedekode gambar biar halamannya ga keburu macet. */}
                  <img
                    src={it.src}
                    draggable={false}
                    alt={it.alt}
                    loading="lazy"
                    decoding="async"
                    fetchPriority={i < 30 ? "auto" : "low"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" onClick={closeEnlarged} />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}
