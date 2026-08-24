// EXPORTS: IAbout, MOCK_ABOUT
export interface IAbout {
  id: string
  title: string
  tagline: string
  brandStory: string
  philosophyTitle: string
  philosophyDescription: string
  qualityTitle: string
  qualityDescription: string
  imageUrl: string
}

export const MOCK_ABOUT: IAbout[] = [
  {
    id: '1',
    title: 'Ancient Wisdom, Modern Wellness',
    tagline: 'REN TCM Apothecary',
    brandStory: 'Rooted in thousands of years of Traditional Chinese Medicine wisdom, REN TCM Apothecary brings premium herbal remedies and wellness products to modern lifestyles. We bridge the gap between ancient healing traditions and contemporary self-care, offering 106 carefully selected products across 12 categories to support your holistic wellbeing journey.',
    philosophyTitle: 'Our Philosophy',
    philosophyDescription: 'We believe that true wellness comes from harmony — between body and mind, nature and nurture, tradition and innovation. Every product in our apothecary is thoughtfully curated to embody the TCM principles of balance, prevention, and natural healing, adapted for the needs of today.',
    qualityTitle: 'Our Quality Promise',
    qualityDescription: 'We source only the finest herbs and ingredients from trusted suppliers, with rigorous quality control at every step. From raw herbs to patent medicines, each product meets strict standards of purity, potency, and authenticity — bringing you the best of TCM in every package.',
    imageUrl: '',
  },
]