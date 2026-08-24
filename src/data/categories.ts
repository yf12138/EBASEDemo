// EXPORTS: ICategory, MOCK_CATEGORIES
export interface ICategory {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
  iconName: string
}

export const MOCK_CATEGORIES: ICategory[] = [
  {
    id: '1',
    name: 'Chinese Herbal Medicine',
    slug: 'raw-herbs',
    description: 'Premium raw herbs for traditional remedies and soups',
    productCount: 6,
    iconName: 'Leaf'
  },
  {
    id: '2',
    name: 'Premium Fine Herbs',
    slug: 'fine-herbs',
    description: 'Luxury tonics including ginseng, cordyceps, and bird\'s nest',
    productCount: 6,
    iconName: 'Crown'
  },
  {
    id: '3',
    name: 'Chinese Patent Medicine',
    slug: 'patent-medicine',
    description: 'Classic prepared formulas in pill, tablet, and syrup form',
    productCount: 6,
    iconName: 'Pill'
  },
  {
    id: '4',
    name: 'Herbal Soup Packs',
    slug: 'soup-packs',
    description: 'Pre-packaged herbal blends for nutritious homemade soups',
    productCount: 6,
    iconName: 'Soup'
  },
  {
    id: '5',
    name: 'Health Tea & Herbal Tea',
    slug: 'herbal-tea',
    description: 'Wellness teas and herbal infusions for daily health',
    productCount: 6,
    iconName: 'Tea'
  },
  {
    id: '6',
    name: 'Topical External Medicine',
    slug: 'topical-medicine',
    description: 'Ointments, oils, patches, and sprays for external pain relief',
    productCount: 6,
    iconName: 'Tube'
  },
  {
    id: '7',
    name: 'Moxibustion & Acupuncture Supplies',
    slug: 'moxibustion',
    description: 'Moxa sticks, needles, and TCM therapy tools',
    productCount: 6,
    iconName: 'Flame'
  },
  {
    id: '8',
    name: 'Nourishing Food Ingredients',
    slug: 'food-ingredients',
    description: 'Edible medicinal ingredients for cooking and desserts',
    productCount: 6,
    iconName: 'Bowl'
  },
  {
    id: '9',
    name: 'TCM Personal Care',
    slug: 'personal-care',
    description: 'Herbal hair care, body care, and wellness products',
    productCount: 6,
    iconName: 'Sparkles'
  }
]
