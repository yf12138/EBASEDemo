import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import FeaturedSection from './FeaturedSection';
import ValuesSection from './ValuesSection';
import NewsletterSection from './NewsletterSection';

export default function HomePage() {
  return (
    <div className="bg-[#F5F0EB]">
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      {/* <ValuesSection /> */}
      <NewsletterSection />
    </div>
  );
}
