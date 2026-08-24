// EXPORTS: IHome, MOCK_HOME
export interface IHome {
  id: string
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  heroImageUrl: string
  sectionLabelCategories: string
  sectionLabelFeatured: string
  sectionLabelStory: string
  sectionLabelNewsletter: string
  storyTitle: string
  storyDescription: string
  newsletterTitle: string
  newsletterSubtitle: string
  newsletterPlaceholder: string
  newsletterButtonText: string
  featuredCount: number
}

export const MOCK_HOME: IHome[] = [
  {
    id: '1',
    heroTitle: 'Ancient Wisdom, Modern Wellness',
    heroSubtitle: 'Discover 106 carefully selected Traditional Chinese Medicine products, crafted for your everyday wellbeing.',
    heroCtaText: 'Shop Now',
    heroImageUrl: 'https://aka.doubaocdn.com/s/nnPowUBq2R',
    sectionLabelCategories: 'OUR CATEGORIES',
    sectionLabelFeatured: 'FEATURED PRODUCTS',
    sectionLabelStory: 'OUR STORY',
    sectionLabelNewsletter: 'NEWSLETTER',
    storyTitle: 'Rooted in Tradition, Crafted for Today',
    storyDescription: 'REN TCM Apothecary brings the timeless wisdom of Traditional Chinese Medicine to modern life. Each product is thoughtfully sourced to deliver authentic, premium-quality wellness essentials.',
    newsletterTitle: 'Join Our Wellness Community',
    newsletterSubtitle: 'Subscribe for health tips, new arrivals, and exclusive offers.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButtonText: 'Subscribe',
    featuredCount: 8,
  },
]