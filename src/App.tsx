import { useState, useEffect } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Solutions } from './components/Solutions';
import { ExecutionStandards } from './components/ExecutionStandards';
import { HowItWorks } from './components/HowItWorks';
import { SolarSavingsCalculator } from './components/SolarSavingsCalculator';
import { CaseStudies } from './components/CaseStudies';
import { FounderSection } from './components/FounderSection';
import { CustomerReviews } from './components/CustomerReviews';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ModernizeCTA } from './components/ModernizeCTA';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ProductModal } from './components/ProductModal';
import { QuoteModal } from './components/QuoteModal';
import { AdminHeroManager } from './components/AdminHeroManager';
import type { PortfolioProduct } from './types';

export function App() {
  // Routing state: Check if path is /admin
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Dynamic Hero Image state fetched from /api/hero-image
  const [heroImage, setHeroImage] = useState<string | undefined>(undefined);

  // Initialize Lenis smooth scroll for public site
  useLenisScroll();

  // Listen to popstate for URL updates
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);


  // Fetch current Hero Image dynamically on homepage mount
  useEffect(() => {
    if (currentPath !== '/admin' && currentPath !== '/admin/') {
      let isMounted = true;
      fetch('/api/hero-image', { cache: 'no-store' })
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (isMounted && data && data.url) {
            setHeroImage(data.url);
          }
        })
        .catch((err) => {
          console.warn('Could not fetch custom hero image, using default:', err);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [currentPath]);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<PortfolioProduct | null>(null);
  const [modalInitialBill, setModalInitialBill] = useState(5000);
  const [modalSelectedProduct, setModalSelectedProduct] = useState('');

  const handleOpenQuote = (initialBill?: number, productName?: string) => {
    if (initialBill) setModalInitialBill(initialBill);
    if (productName) setModalSelectedProduct(productName);
    setQuoteModalOpen(true);
  };

  const handleScrollToSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // If path is /admin or /admin/, render the dedicated single-purpose Hero Image Manager
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminHeroManager />;
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-red-600 selection:text-white font-sans">
      
      {/* 1. Header / Navbar (Clean Brand Header with CTA) */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* 2. Hero Section (Powering Andhra Pradesh & Telangana with Clean Solar Energy) */}
      <Hero
        onOpenQuote={() => handleOpenQuote()}
        onExploreSolutions={handleScrollToSolutions}
        heroImage={heroImage}
      />

      {/* 3. Floating Stats Strip (500+ Projects, 25 MW+ Capacity, 10+ Years, 99% Satisfaction) */}
      <Stats />

      {/* 4. Our Solutions Section (Tailored Solar Architectures for Every Scale) */}
      <Solutions
        onSelectProduct={(product) => setSelectedProductModal(product)}
      />

      {/* 5. Institutional-Grade Execution Standards & Quality Engineering */}
      <ExecutionStandards />

      {/* 6. How It Works: 4-Step Transparent Onboarding Workflow */}
      <HowItWorks />

      {/* 9. Plan Your Investment (Interactive Solar Generation & ROI Calculator) */}
      <SolarSavingsCalculator
        onClaimQuote={(bill) => handleOpenQuote(bill, 'Solar ROI Calculation')}
      />

      {/* 10. Our Work (Verified Regional Installation Case Studies - Big Photos, No Quote Trigger) */}
      <CaseStudies />

      {/* 10.1 Leadership & Founder Section */}
      <FounderSection onOpenQuote={() => handleOpenQuote(0, 'Founder Consultation')} />

      {/* 11. Customer Reviews (Verified 5-Star Ratings & Feedback) */}
      <CustomerReviews />

      {/* 12. Why Choose Us (Local AP/TS Base & Cyclone-Resistant Engineering) */}
      <WhyChooseUs />

      {/* 13. Get Started / Modernize Infrastructure & Request a Quote Form */}
      <ModernizeCTA />

      {/* 14. Comprehensive Regional Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* 15. Quick Floating Helpline & WhatsApp Actions */}
      <FloatingActions />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onRequestQuote={(productName) => handleOpenQuote(5000, productName)}
      />

      {/* Quote Consultation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialBill={modalInitialBill}
        selectedProduct={modalSelectedProduct}
      />


    </div>
  );
}

export default App;
