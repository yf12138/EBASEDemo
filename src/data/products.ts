// EXPORTS: IProduct, ICategory, ALL_PRODUCTS, ALL_CATEGORIES, getProductsByCategory, getProductById

export interface IProduct {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  specification: string;
  price: number;
  description: string;
  imageIndex: string; // Local product image filename in public/product-images
}

export interface ICategory {
  slug: string;
  name: string;
  count: number;
  description: string;
  iconIndex: number;
}

export const ALL_CATEGORIES: ICategory[] = [
  { slug: 'chinese-herbal-medicine', name: 'Chinese Herbal Medicine', count: 6, description: 'Raw herbs for traditional prescriptions', iconIndex: 0 },
  { slug: 'premium-fine-herbs', name: 'Premium Fine Herbs', count: 6, description: 'Rare & precious tonic herbs', iconIndex: 1 },
  { slug: 'chinese-patent-medicine', name: 'Chinese Patent Medicine', count: 6, description: 'Ready-to-use pill & syrup formulas', iconIndex: 2 },
  { slug: 'herbal-soup-packs', name: 'Herbal Soup Packs', count: 6, description: 'Pre-assembled therapeutic soups', iconIndex: 3 },
  { slug: 'health-tea-herbal-tea', name: 'Health Tea & Herbal Tea', count: 6, description: 'Wellness teas for every constitution', iconIndex: 4 },
  { slug: 'topical-external-medicine', name: 'Topical External Medicine', count: 6, description: 'Ointments, oils & patches', iconIndex: 7 },
  { slug: 'moxibustion-acupuncture', name: 'Moxibustion & Acupuncture Supplies', count: 6, description: 'TCM therapy essentials', iconIndex: 8 },
  { slug: 'nourishing-food-ingredients', name: 'Nourishing Food Ingredients', count: 6, description: 'Food-medicine dual-use ingredients', iconIndex: 9 },
  // { slug: 'tcm-personal-care', name: 'TCM Personal Care', count: 6, description: 'Herbal body & skincare', iconIndex: 10 },
];

export const ALL_PRODUCTS: IProduct[] = [
  // 1. Chinese Herbal Medicine - 6 items exported
  { id: 'p001', name: 'Dang Gui / Angelica Sinensis Root', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '100g', price: 18.50, description: 'Tonifies blood, invigorates circulation, regulates menstruation, relieves pain; essential gynecological herb.', imageIndex: 'Dang Gui - Angelica Sinensis Root.jpg' },
  { id: 'p002', name: 'Huang Qi / Astragalus Root', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '100g', price: 13.00, description: 'Tonifies qi, raises yang, consolidates exterior to stop sweating, reduces edema; immune booster.', imageIndex: 'Huang Qi - Astragalus Root.jpg' },
  { id: 'p003', name: 'Dang Shen / Codonopsis Root', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '100g', price: 22.50, description: 'Tonifies middle-jiao and qi, benefits spleen and lung; milder substitute for ginseng.', imageIndex: 'Dang Shen - Codonopsis Root.jpg' },
  { id: 'p004', name: 'Gou Qi Zi / Goji Berries', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '250g', price: 25.00, description: 'Nourishes liver and kidney, benefits essence and improves vision; daily wellness staple.', imageIndex: 'Gou Qi Zi - Goji Berries.jpg' },
  { id: 'p005', name: 'Hong Zao / Red Dates (Pitted)', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '400g', price: 14.00, description: 'Tonifies qi, nourishes blood, calms spirit; essential for soups and teas.', imageIndex: 'Hong Zao - Red Dates (Pitted).jpg' },
  { id: 'p006', name: 'Bai Zhu / White Atractylodes Rhizome', category: 'Chinese Herbal Medicine', categorySlug: 'chinese-herbal-medicine', specification: '100g', price: 15.00, description: 'Strengthens spleen, tonifies qi, dries dampness, promotes diuresis, stops sweating.', imageIndex: 'Bai Zhu - White Atractylodes Rhizome.jpg' },

  // 2. Premium Fine Herbs - 6 items exported
  { id: 'p011', name: 'American Ginseng Slices', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '40g/box', price: 113.00, description: 'Tonifies qi and yin, clears heat, promotes fluid production; refreshes and fights fatigue.', imageIndex: 'American Ginseng Slices.jpg' },
  { id: 'p012', name: 'American Ginseng Whole Roots', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '150g/box', price: 358.00, description: 'Whole American ginseng roots; can be sliced, brewed in soup, or consumed sublingually.', imageIndex: 'American Ginseng Whole Roots.jpg' },
  { id: 'p013', name: 'Cordyceps Sinensis / Dong Chong Xia Cao', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '10g/box', price: 630.00, description: 'Tonifies kidney and lung, stops bleeding, resolves phlegm; premium tonic.', imageIndex: 'Cordyceps Sinensis - Dong Chong Xia Cao.jpg' },
  { id: 'p014', name: 'Cordyceps Militaris / Cordyceps Flower', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '100g', price: 15.50, description: 'Cultivated substitute for wild cordyceps; benefits lung and kidney, boosts essence; cost-effective.', imageIndex: 'Cordyceps Militaris - Cordyceps Flower.jpg' },
  { id: 'p015', name: 'Edible Bird\'s Nest (Cleansed)', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '50g/box (~7 pcs)', price: 565.00, description: 'Nourishes yin and moistens lung, beautifies skin; Malaysian specialty.', imageIndex: 'Edible Bird\'s Nest (Cleansed).jpg' },
  { id: 'p016', name: 'Instant Bird\'s Nest with Rock Sugar', category: 'Premium Fine Herbs', categorySlug: 'premium-fine-herbs', specification: '6x70ml/box', price: 164.00, description: 'Ready-to-drink, convenient tonic, popular gift choice.', imageIndex: 'Instant Bird\'s Nest with Rock Sugar.jpg' },

  // 3. Chinese Patent Medicine - 6 items exported
  { id: 'p021', name: 'Liuwei Dihuang Pills', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '360 pills/bottle', price: 41.50, description: 'Nourishes yin and tonifies kidney; for kidney-yin deficiency, dizziness, tinnitus, sore lower back.', imageIndex: 'Liuwei Dihuang Pills.jpg' },
  { id: 'p022', name: 'Jinkui Shenqi Pills', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '360 pills/bottle', price: 44.00, description: 'Warms and tonifies kidney yang, transforms qi and promotes water metabolism; for kidney-deficiency edema.', imageIndex: 'Jinkui Shenqi Pills.jpg' },
  { id: 'p023', name: 'Gold Label Bak Foong Pills (Small Pill)', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '14g x 6 packs/box', price: 96.50, description: 'Tonifies qi and blood, regulates menstruation, stops leukorrhea; for menstrual irregularity and postnatal care.', imageIndex: 'Gold Label Bak Foong Pills (Small Pill).jpg' },
  { id: 'p024', name: 'Wuji Baifeng Pills / Black Boned Chicken Pills', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '9g x 10 pills/box', price: 56.50, description: 'Tonifies qi and blood, regulates menstruation; for qi-blood deficiency and emaciation.', imageIndex: 'Wuji Baifeng Pills - Black Boned Chicken Pills.jpg' },
  { id: 'p025', name: 'Angong Niuhuang Pills / Calm Palace Pills', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '1 pill/box (3g)', price: 238.00, description: 'Clears heat and toxin, calms convulsion, opens orifices; emergency use for stroke coma and encephalitis.', imageIndex: 'Angong Niuhuang Pills - Calm Palace Pills.jpg' },
  { id: 'p026', name: 'Huoxiang Zhengqi Liquid', category: 'Chinese Patent Medicine', categorySlug: 'chinese-patent-medicine', specification: '10ml x 10 vials/box', price: 18.50, description: 'Releases exterior and resolves dampness, regulates qi; for summer-damp cold and GI discomfort.', imageIndex: 'Huoxiang Zhengqi Liquid.jpg' },

  // 4. Herbal Soup Packs - 6 items exported
  { id: 'p031', name: 'Ba Zhen Tang / Eight Treasures Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '128g/pack', price: 25.00, description: 'Classic qi-blood tonifying formula with 8 herbs including dang gui, chuan xiong, bai shao.', imageIndex: 'Ba Zhen Tang - Eight Treasures Soup.jpg' },
  { id: 'p032', name: 'Si Shen Tang / Four Spirits Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '100g/pack', price: 15.00, description: 'Strengthens spleen and drains dampness; contains poria, yam, lotus seed, euryale; gentle tonic.', imageIndex: 'Si Shen Tang - Four Spirits Soup.jpg' },
  { id: 'p033', name: 'Sha Shen Run Fei Tang / Adenophora Lung-Moistening Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '76g/pack', price: 20.00, description: 'Nourishes yin and moistens lung, resolves phlegm and stops cough; ideal for dry seasons.', imageIndex: 'Sha Shen Run Fei Tang - Adenophora Lung-Moistening Soup.jpg' },
  { id: 'p034', name: 'Dang Gui Huang Qi Blood Tonic Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '80g/pack', price: 17.00, description: 'Tonifies qi to generate blood; suitable for postnatal, post-surgery, and anemic individuals.', imageIndex: 'Dang Gui Huang Qi Blood Tonic Soup.jpg' },
  { id: 'p035', name: 'Du Zhong Ba Ji Kidney Tonic Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '90g/pack', price: 26.50, description: 'Tonifies liver and kidney, strengthens bones and tendons; for lower back weakness and fatigue.', imageIndex: 'Du Zhong Ba Ji Kidney Tonic Soup.jpg' },
  { id: 'p036', name: 'American Ginseng & Cordyceps Flower Soup', category: 'Herbal Soup Packs', categorySlug: 'herbal-soup-packs', specification: '60g/pack', price: 36.50, description: 'Tonifies qi and yin, moistens lung and benefits essence; premium wellness soup.', imageIndex: 'Flower Soup.jpg' },

  // 5. Health Tea & Herbal Tea - 6 items exported
  { id: 'p039', name: 'Luo Han Guo / Monk Fruit', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '1 pc (large)', price: 5.75, description: 'Clears heat and moistens lung, soothes throat, promotes bowel movement; natural sweetener.', imageIndex: 'Luo Han Guo - Monk Fruit.jpg' },
  { id: 'p040', name: 'Chrysanthemum Tea (Bud)', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '100g', price: 17.00, description: 'Disperses wind and clears heat, calms liver and improves vision; for eye strain and heatiness.', imageIndex: 'Chrysanthemum Tea (Bud).jpg' },
  { id: 'p041', name: 'Qu Shi Cha / Dampness-Expelling Tea', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '80g x 2 packs', price: 25.00, description: 'Strengthens spleen and drains dampness, clears heat and toxin; for damp-heat constitution.', imageIndex: 'Qu Shi Cha - Dampness-Expelling Tea.jpg' },
  { id: 'p042', name: 'Wu Hua Cha / Five Flowers Tea', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '80g x 2 packs', price: 28.50, description: 'Clears heat and toxin, drains dampness and cools blood; contains 5 flowers including honeysuckle.', imageIndex: 'Wu Hua Cha - Five Flowers Tea.jpg' },
  { id: 'p043', name: 'Zhu Zhe Liang Cha / Sugarcane Cooling Tea', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '80g x 2 packs', price: 23.00, description: 'Clears heat and promotes fluid, moistens dryness and resolves toxin; classic Malaysian herbal tea.', imageIndex: 'Zhu Zhe Liang Cha - Sugarcane Cooling Tea.jpg' },
  { id: 'p044', name: 'Qi Xing Cha / Seven Star Tea (Children)', category: 'Health Tea & Herbal Tea', categorySlug: 'health-tea-herbal-tea', specification: '20g x 2 packs', price: 17.00, description: 'For children; improves appetite, resolves stagnation, clears heat, calms fright; reduces night crying.', imageIndex: 'Qi Xing Cha - Seven Star Tea (Children).jpg' },

  // 6. Topical External Medicine - 6 items exported
  { id: 'p067', name: 'Tiger Balm Ointment (Red/White)', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '19g/box', price: 10.90, description: 'Relieves muscle aches, insect bites, headache and nasal congestion; household essential.', imageIndex: 'Tiger Balm Ointment (Red-White).jpg' },
  { id: 'p068', name: 'Tiger Balm Plaster (Warm)', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '7x10cm x 2 pcs', price: 7.75, description: 'Patch form; warming relief for shoulder, neck, back muscle pain.', imageIndex: 'Tiger Balm Plaster (Warm).jpg' },
  { id: 'p069', name: 'Tiger Balm Neck & Shoulder Rub (Extra Strength)', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '50g/tube', price: 38.00, description: 'Specifically for neck and shoulder stiffness and pain; immediate soothing relief on application.', imageIndex: 'Tiger Balm Neck & Shoulder Rub (Extra Strength).jpg' },
  { id: 'p070', name: 'Red Flower Oil / Zheng Hong Hua You', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '50ml/bottle', price: 20.00, description: 'Invigorates blood and relieves pain, expels wind and dampness; for bruises and rheumatic pain.', imageIndex: 'Red Flower Oil - Zheng Hong Hua You.jpg' },
  { id: 'p071', name: 'Kwan Loong Oil / Huo Luo Oil', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '50ml/bottle', price: 23.50, description: 'Relaxes tendons and activates collaterals, expels wind and dissipates stasis; for muscle and joint pain.', imageIndex: 'Kwan Loong Oil - Huo Luo Oil.jpg' },
  { id: 'p072', name: 'Po Sum On Medicated Oil', category: 'Topical External Medicine', categorySlug: 'topical-external-medicine', specification: '30ml/bottle', price: 26.50, description: 'Expels wind and relieves pain, opens orifices and reduces swelling; for headache, abdominal pain, insect bites.', imageIndex: 'Po Sum On Medicated Oil.jpg' },

  // 7. Moxibustion & Acupuncture Supplies - 6 items exported
  { id: 'p077', name: 'Pure Moxa Sticks / Ai Tiao', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '10 pcs/box', price: 25.00, description: 'Rolled mugwort fluff; for moxibustion to warm meridians, unblock collaterals, dispel cold and relieve pain.', imageIndex: 'Pure Moxa Sticks - Ai Tiao.jpg' },
  { id: 'p078', name: 'Moxa Cones / Ai Zhu', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '54 pcs/box', price: 20.00, description: 'Short moxa cones for use with moxa boxes; convenient portable moxibustion.', imageIndex: 'Moxa Cones - Ai Zhu.jpg' },
  { id: 'p079', name: 'Portable Moxibustion Box', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '1 pc', price: 31.50, description: 'Stainless steel/copper moxa box with strap; portable warm moxibustion anywhere.', imageIndex: 'Portable Moxibustion Box.jpg' },
  { id: 'p080', name: 'Smokeless Moxa Sticks', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '10 pcs/box', price: 31.00, description: 'Carbonized treatment, minimal smoke; suitable for indoor use and smoke-sensitive individuals.', imageIndex: 'Smokeless Moxa Sticks.jpg' },
  { id: 'p081', name: 'Disposable Sterile Acupuncture Needles', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '100 pcs/box', price: 40.00, description: 'Individually packed sterile acupuncture needles, multiple sizes; for professional treatment.', imageIndex: 'Disposable Sterile Acupuncture Needles.jpg' },
  { id: 'p082', name: 'Acupoint Patch (Sanfu Patch)', category: 'Moxibustion & Acupuncture Supplies', categorySlug: 'moxibustion-acupuncture', specification: '6 patches/box', price: 28.00, description: 'TCM herbal patches applied to acupoints; winter disease summer treatment, improves respiratory and allergy.', imageIndex: 'Acupoint Patch (Sanfu Patch).jpg' },

  // 8. Nourishing Food Ingredients - 6 items exported
  { id: 'p085', name: 'Snow Fungus / White Fungus / Yin Er', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '100g', price: 13.00, description: 'Nourishes yin and moistens lung, benefits stomach and promotes fluid; used in desserts, poor man\'s bird\'s nest.', imageIndex: 'Snow Fungus - White Fungus - Yin Er.jpg' },
  { id: 'p086', name: 'Peach Gum / Tao Jiao', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '250g', price: 18.50, description: 'Plant collagen; beautifies skin, promotes bowel movement; essential for sweet soups.', imageIndex: 'Peach Gum - Tao Jiao.jpg' },
  { id: 'p087', name: 'Dried Chinese Yam / Shan Yao', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '300g', price: 25.00, description: 'Strengthens spleen and stomach, nourishes kidney and essence; food-medicine dual use for soups and porridge.', imageIndex: 'Dried Chinese Yam - Shan Yao.jpg' },
  { id: 'p088', name: 'Fragrant Solomon\'s Seal / Yu Zhu', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '150g', price: 17.00, description: 'Nourishes yin and moistens dryness, promotes fluid and stops thirst; for lung-stomach yin deficiency.', imageIndex: 'Fragrant Solomon\'s Seal - Yu Zhu.jpg' },
  { id: 'p089', name: 'Lotus Seeds / Lian Zi', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '200g', price: 16.00, description: 'Strengthens spleen and stops diarrhea, benefits kidney, calms heart and spirit; key ingredient in Si Shen Tang.', imageIndex: 'Lotus Seeds - Lian Zi.jpg' },
  { id: 'p090', name: 'Euryale Seed / Qian Shi', category: 'Nourishing Food Ingredients', categorySlug: 'nourishing-food-ingredients', specification: '200g', price: 18.50, description: 'Benefits kidney and secures essence, strengthens spleen and stops diarrhea, drains dampness; Si Shen Tang ingredient.', imageIndex: 'Euryale Seed - Qian Shi.jpg' },

  // 9. TCM Personal Care - 6 items
  { id: 'p095', name: 'TCM Anti-Hair Loss Shampoo', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '300ml/bottle', price: 56.50, description: 'He Shou Wu, ginseng and other TCM ingredients; prevents hair loss, strengthens roots, nourishes scalp.', imageIndex: 'TCM Anti-Hair Loss Shampoo.jpg' },
  { id: 'p096', name: 'Herbal Body Wash', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '500ml/bottle', price: 40.00, description: 'TCM herbal formula; cleanses skin, drains dampness and relieves itching, long-lasting fragrance.', imageIndex: 'Herbal Body Wash.jpg' },
  { id: 'p097', name: 'TCM Herbal Toothpaste', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '120g/tube', price: 13.00, description: 'Tian Qi, honeysuckle and other TCM ingredients; clears heat, protects gums, strengthens teeth.', imageIndex: 'TCM Herbal Toothpaste.jpg' },
  { id: 'p098', name: 'Herbal Foot Bath Pack', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '20 packs/bag', price: 28.00, description: 'Mugwort, ginger, safflower etc.; foot soak to drain dampness, warm body, aid sleep.', imageIndex: 'Herbal Foot Bath Pack.jpg' },
  { id: 'p099', name: 'TCM Facial Mask Powder', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '100g/jar', price: 48.00, description: 'Pearl powder, bai zhi etc.; whitens and fades spots, controls oil and reduces acne.', imageIndex: 'TCM Facial Mask Powder.jpg' },
  { id: 'p100', name: 'Herbal Pillow / Triangular Neck Pillow', category: 'TCM Personal Care', categorySlug: 'tcm-personal-care', specification: '1 pc', price: 46.00, description: 'Filled with mugwort, cassia seed etc.; calms spirit and aids sleep, supports neck therapy.', imageIndex: 'Herbal Pillow - Triangular Neck Pillow.jpg' },

];

export function getProductsByCategory(categorySlug: string): IProduct[] {
  if (categorySlug === 'all') return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p => p.categorySlug === categorySlug);
}

export function getProductById(id: string): IProduct | undefined {
  return ALL_PRODUCTS.find(p => p.id === id);
}
