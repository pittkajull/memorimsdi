# Mindahin foto asli dari public/images/ ke _originals/ — sekali jalan doang.
#
#   powershell -ExecutionPolicy Bypass -File scripts/move-originals.ps1
#
# Kenapa dipindah: yang dibaca kode cuma .webp. Selama aslinya masih di
# public/, dia ikut ke-deploy walau ga pernah dibuka — ukuran deploy jadi
# dobel buat file yang ga kepake. Di luar public/ dia tetep ke-commit ke git
# (jadi tetep aman ke-backup) tapi ga ikut ke-upload.
#
# Yang dipindah cuma .jpg/.jpeg/.png. File .webp dan .svg tetep di tempatnya.
# Pakai `git mv` biar git-nya ngerti ini pindahan, bukan hapus + bikin baru.

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

$src = "public/images"
$dst = "_originals"

if (-not (Test-Path $src)) { throw "Folder $src ga ketemu." }

$files = Get-ChildItem $src -Recurse -File |
  Where-Object { $_.Extension -match '(?i)^\.(jpe?g|png)$' }

if ($files.Count -eq 0) {
  Write-Output "Ga ada file asli di $src — kayanya udah dipindah."
  exit 0
}

$total = ($files | Measure-Object Length -Sum).Sum / 1MB
Write-Output ""
Write-Output ("Mindahin {0} file ({1:N1} MB) dari {2}/ ke {3}/" -f $files.Count, $total, $src, $dst)
Write-Output ""

$moved = 0
$plain = 0

foreach ($f in $files) {
  # Jalur relatif di dalam public/images ditiru apa adanya di _originals
  $sub = $f.FullName.Substring((Resolve-Path $src).Path.Length).TrimStart('\', '/')
  $target = Join-Path $dst $sub
  $dir = Split-Path $target -Parent

  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

  if (Test-Path $target) {
    Write-Output "  ~ $sub  (udah ada di tujuan, dilewat)"
    continue
  }

  # git mv cuma jalan buat file yang ke-track. Yang belum ke-track dipindah
  # biasa pakai Move-Item — hasilnya sama, cuma ga ada riwayat buat dijaga.
  git mv --  $f.FullName $target 2>$null
  if ($LASTEXITCODE -eq 0) {
    $moved++
  } else {
    Move-Item -LiteralPath $f.FullName -Destination $target
    $plain++
  }
}

# Folder kosong yang ketinggalan dibersihin
Get-ChildItem $src -Recurse -Directory |
  Where-Object { -not (Get-ChildItem $_.FullName -Recurse -File) } |
  Remove-Item -Recurse -Force -Confirm:$false

Write-Output ""
Write-Output "Selesai: $moved lewat git mv, $plain pindah biasa."
Write-Output ""
Write-Output "Cek dulu sebelum commit:"
Write-Output "  git status"
Write-Output "  npm run build"
Write-Output ""
