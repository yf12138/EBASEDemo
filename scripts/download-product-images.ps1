$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$productsPath = Join-Path $root 'src/data/products.ts'
$outputDir = Join-Path $root 'public/product-images'
$manifestPath = Join-Path $outputDir 'sources.json'
$queryMapPath = Join-Path $root 'scripts/product-query-aliases.json'
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$queryMap = Get-Content $queryMapPath -Raw -Encoding UTF8 | ConvertFrom-Json
Get-ChildItem $outputDir -File -Filter '*.jpg' | Remove-Item -Force

$fallbackImages = @{
  'chinese-herbal-medicine' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3chsgijo_ve_miaoda'
  'premium-fine-herbs' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3b3slyqg_ve_miaoda'
  'chinese-patent-medicine' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3b3slyqg_ve_miaoda'
  'herbal-soup-packs' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3ch3c6fg_ve_miaoda'
  'health-tea-herbal-tea' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3doo44mo_ve_miaoda'
  'topical-external-medicine' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3chsgijo_ve_miaoda'
  'moxibustion-acupuncture' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3chsgijo_ve_miaoda'
  'nourishing-food-ingredients' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3ch3c6fg_ve_miaoda'
  'tcm-personal-care' = 'https://4kvuup3ct1d7f.feishuapp.com/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3doo44mo_ve_miaoda'
}

$scientificMap = @{
  p001 = 'Angelica sinensis'; p002 = 'Astragalus membranaceus'; p003 = 'Codonopsis pilosula'; p004 = 'Lycium barbarum'; p006 = 'Atractylodes macrocephala'; p011 = 'Panax quinquefolius'; p012 = 'Panax quinquefolius'; p013 = 'Ophiocordyceps sinensis'; p014 = 'Cordyceps militaris'; p039 = 'Siraitia grosvenorii'; p040 = 'Chrysanthemum morifolium'; p077 = 'Artemisia argyi'; p085 = 'Tremella fuciformis'; p087 = 'Dioscorea polystachya'; p088 = 'Polygonatum odoratum'; p090 = 'Euryale ferox'
}

function Get-FileName([string]$name) {
  $name = [regex]::Replace($name, '\s*/\s*', ' - ')
  $name = [regex]::Replace($name, '[<>:"\\|?*]', '')
  $name = [regex]::Replace($name, '\s+', ' ').Trim()
  return "$name.jpg"
}

function Save-Image([string]$url, [string]$destination) {
  try {
    Invoke-WebRequest -Uri $url -OutFile $destination -UseBasicParsing -TimeoutSec 60 -Headers @{ Accept = 'image/*' }
    return (Test-Path $destination) -and ((Get-Item $destination).Length -gt 1000)
  } catch {
    if (Test-Path $destination) { Remove-Item -LiteralPath $destination -Force }
    return $false
  }
}

function Get-InaturalistResult([string]$scientificName) {
  try {
    $endpoint = "https://api.inaturalist.org/v1/taxa?q=$([uri]::EscapeDataString($scientificName))&per_page=1"
    $taxon = (Invoke-RestMethod -Uri $endpoint -TimeoutSec 30).results | Select-Object -First 1
    if ($taxon -and $taxon.default_photo.medium_url) {
      return [pscustomobject]@{ url = $taxon.default_photo.medium_url; title = $taxon.name; creator = $taxon.default_photo.attribution_name; license = $taxon.default_photo.license_code; provider = 'iNaturalist' }
    }
  } catch { Write-Warning "iNaturalist failed: $scientificName" }
  return $null
}

function Get-OpenverseResult([string]$query) {
  try {
    $endpoint = "https://api.openverse.org/v1/images/?q=$([uri]::EscapeDataString($query))&page_size=8"
    $results = (Invoke-RestMethod -Uri $endpoint -TimeoutSec 30).results
    $tokens = $query.ToLower().Split(' ') | Where-Object { $_.Length -gt 1 }
    return $results |
      Where-Object { ($_.filetype -eq $null -or $_.filetype -in @('jpg','jpeg','png','webp','gif')) -and $_.width -ge 200 -and $_.height -ge 200 } |
      ForEach-Object {
        $haystack = ("$($_.title) $($_.tags.name -join ' ')").ToLower(); $score = 0
        foreach ($token in $tokens) { if ($haystack.Contains($token)) { $score++ } }
        $_ | Add-Member -NotePropertyName MatchScore -NotePropertyValue $score -PassThru
      } | Where-Object { $_.MatchScore -ge 1 } | Sort-Object MatchScore -Descending | Select-Object -First 1
  } catch { Write-Warning "Openverse failed: $query" }
  return $null
}

$source = Get-Content $productsPath -Raw
$pattern = "\{ id: '([^']+)', name: '((?:\\'|[^'])+)'[^}]+categorySlug: '([^']+)'[^}]+imageIndex: '((?:\\'|[^'])+)'"
$products = [regex]::Matches($source, $pattern) | ForEach-Object {
  [pscustomobject]@{ id = $_.Groups[1].Value; name = $_.Groups[2].Value -replace "\\'", "'"; category = $_.Groups[3].Value; filename = $_.Groups[4].Value -replace "\\'", "'" }
}
$manifest = @{}

foreach ($product in $products) {
  $filename = $product.filename
  $target = Join-Path $outputDir $filename
  $queries = if ($queryMap.PSObject.Properties.Name -contains $product.id) { @($queryMap.($product.id)) } else { @($product.name -replace '/', ' ') }
  $sourceInfo = $null
  $downloaded = $false

  if ($scientificMap.ContainsKey($product.id)) {
    $sourceInfo = Get-InaturalistResult $scientificMap[$product.id]
    if ($sourceInfo) { $downloaded = Save-Image $sourceInfo.url $target; if (-not $downloaded) { $sourceInfo = $null } }
  }

  if (-not $downloaded) {
    foreach ($query in $queries) {
      $result = Get-OpenverseResult $query
      if (-not $result) { continue }
      $downloadUrl = if ($result.thumbnail) { $result.thumbnail } else { $result.url }
      if (Save-Image $downloadUrl $target) {
        $sourceInfo = [pscustomobject]@{ url = $downloadUrl; title = $result.title; creator = $result.creator; license = $result.license; licenseUrl = $result.license_url; landingUrl = $result.foreign_landing_url; provider = $result.provider }
        $downloaded = $true
        break
      }
      Start-Sleep -Milliseconds 400
    }
  }

  if (-not $downloaded) {
    $fallbackUrl = $fallbackImages[$product.category]
    Save-Image $fallbackUrl $target | Out-Null
    $sourceInfo = [pscustomobject]@{ url = $fallbackUrl; title = 'Category fallback image'; provider = 'Project default image' }
  }

  $manifest[$filename] = $sourceInfo
  Write-Host "[$($product.id)] $filename <- $($sourceInfo.title)"
  Start-Sleep -Milliseconds 500
}

$manifestJson = $manifest | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText($manifestPath, $manifestJson, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Completed $($products.Count) products; manifest entries: $($manifest.Count)"
