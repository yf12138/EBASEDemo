// EXPORTS: PRODUCT_IMAGES, HERO_IMAGE, PULSE_IMAGE

const IMAGE_DOMAIN = 'https://4kvuup3ct1d7f.feishuapp.com';

export const HERO_IMAGE = `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3cluq2fi_ve_miaoda`;

export const PULSE_IMAGE = `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3b3dzioq_ve_miaoda`;

// Category fallback images used only when a product image is unavailable.
export const PRODUCT_IMAGES: string[] = [
  // 0: raw herbs
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3chsgijo_ve_miaoda`,
  // 1: premium tonics (bird's nest / ginseng)
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3b3slyqg_ve_miaoda`,
  // 2: soup packs
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3ch3c6fg_ve_miaoda`,
  // 3: tea
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3doo44mo_ve_miaoda`,
  // 4: ready-to-eat tonic (bottle/jar)
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3b3slyqg_ve_miaoda`,
  // 5: supplement (capsule/bottle) — reuse soup pack warm packaging feel
  `${IMAGE_DOMAIN}/spark/app/app_17cgbjbsq5k/runtime/api/v1/storage/object/bucket_aadkq3eszpoqq_static/static%2Faadkq3chsgijo_ve_miaoda`,
];

export function getProductImage(filename: string): string {
  if (!filename) return PRODUCT_IMAGES[0];
  return `./product-images/${encodeURIComponent(filename)}`;
}
