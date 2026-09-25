import type {
  PortfolioProduct,
  PartnerBrand,
  ProjectItem,
  TestimonialItem,
  CalculatorState,
  CalculationResult,
  SolutionItem,
  FeatureCardItem,
  HowItWorksStep
} from '../types';

export const COMPANY_INFO = {
  name: 'Geeta Solars',
  altName: 'Geetha Solars',
  proprietor: 'Venkatalakshmi Alti',
  gstin: '37BNTPA4712N1ZL',
  legalName: 'Geeta Solars',
  tagline: 'POWERING HOMES & BUSINESSES WITH CLEAN SOLAR ENERGY',
  eyebrow: 'Authorised Solar Energy & PM Surya Ghar Partner',
  address: 'Kothavalasa, Vizianagaram District, Andhra Pradesh - 535183',
  shortAddress: 'Kothavalasa, VZM, Andhra Pradesh',
  landmark: 'Kothavalasa, VZM',
  area: 'Kothavalasa, VZM',
  city: 'Vizianagaram',
  state: 'Andhra Pradesh',
  pincode: '535183',
  phone: '+91 82649 99691',
  altPhone: '+91 91211 58655',
  whatsapp: '918264999691',
  whatsappDisplay: '+91 82649 99691',
  email: 'geetasolars5@gmail.com',
  workingHours: 'Monday – Sunday: 09:00 AM – 08:00 PM',
  paymentModes: ['UPI (GPay / PhonePe / Paytm)', 'Cash', 'Net Banking', 'Credit / Debit Cards', 'Easy EMI Financing'],
  socials: {
    instagram: 'https://www.instagram.com/geetasolars5/',
    facebook: 'https://www.facebook.com/people/Geetha-Solars/pfbid0sbfMpT16vivyFctzGU2aDov7P5XTmEv1MZykxkrPEiz24XGK6ifa4iiBTaX4UXA4l/',
    justdial: 'https://www.justdial.com/Vizianagaram/Geeta-Solars-Near-Old-Railway-Station-Opposite-Kothavalasa/9999P8922-8922-260826132541-Q6U5_BZDET',
    whatsapp: 'https://wa.me/918264999691'
  }
};

export const HERO_DATA = {
  badge: 'Authorised Solar Dealer & PM Surya Ghar Partner',
  headingLine1: 'Powering Andhra Pradesh &',
  headingLine2: 'Telangana with Clean',
  headingHighlight: 'Solar Energy',
  paragraph: 'Geeta Solars provides top-rated rooftop solar installations, PM Surya Ghar Muft Bijli Yojana subsidies (up to ₹78,000), solar home lighting systems, inverters, and battery storage across Kothavalasa, Vizianagaram, and Visakhapatnam.',
  checkpoints: ['PM Surya Ghar Subsidy (₹78,000)', 'Tier-1 High-Efficiency Panels', 'Full APEPDCL Net-Meter Support'],
  featuredCard: {
    title: 'Reliable Solar Solutions Across Andhra Pradesh & Telangana',
    tags: 'Zero Electricity Bills • ₹78k Govt Subsidy • 25-Year Warranty',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop'
  }
};

export const STATS_STRIP = [
  {
    id: 'experience',
    value: '12+',
    label: 'YEARS EXPERIENCE',
    iconType: 'trophy'
  },
  {
    id: 'projects',
    value: '2000+',
    label: 'PROJECTS COMPLETED',
    iconType: 'chart'
  },
  {
    id: 'customers',
    value: '4500+',
    label: 'HAPPY CUSTOMERS',
    iconType: 'users'
  },
  {
    id: 'co2',
    value: '5500+',
    label: 'TONS CO2 REDUCED',
    iconType: 'star'
  }
];

export const SOLUTIONS_GRID = [
  {
    id: 'residential',
    title: 'Residential Rooftop & PM Surya Ghar',
    description: 'Custom solar systems for independent homes and villas. Avail up to ₹78,000 direct bank transfer (DBT) subsidy from the Central Government.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop',
    icon: 'home',
    linkText: 'Learn More →'
  },
  {
    id: 'commercial',
    title: 'Commercial & Institutional Solar',
    description: 'Turnkey solar solutions for hospitals, colleges, offices, shopping complexes, and convention centers with accelerated depreciation benefits.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
    icon: 'building',
    linkText: 'Learn More →'
  },
  {
    id: 'storage',
    title: 'Solar Home Lighting & Inverter Systems',
    description: 'High-performance solar inverters with Tubular & LiFePO4 batteries for 24/7 uninterrupted power backup during grid power cuts.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    icon: 'battery',
    linkText: 'Learn More →'
  },
  {
    id: 'industrial',
    title: 'Industrial Solar & Agro Solutions',
    description: 'High-capacity grid-tied solar plants for rice mills, cold storage facilities, granite processing, and solar agricultural water pumps.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
    icon: 'factory',
    linkText: 'Learn More →'
  }
];

export const COMMITMENT_STANDARDS = [
  {
    id: 'certified',
    title: 'Authorised Dealer & Technicians',
    description: 'Certified local solar experts based right here in Kothavalasa & Vizianagaram.',
    icon: 'shield'
  },
  {
    id: 'premium',
    title: 'Tier-1 Brand Modules',
    description: 'High-efficiency TopCon & Mono-PERC panels from Premier, Adani, Loom Solar & Supreme.',
    icon: 'cog'
  },
  {
    id: 'netmeter',
    title: 'APEPDCL Net-Metering',
    description: 'Complete documentation and liaisoning for DISCOM grid synchronization & subsidy claim.',
    icon: 'check'
  },
  {
    id: 'support',
    title: 'Prompt Local Support',
    description: 'Same-day on-site maintenance, annual servicing, and 25-year linear performance warranty.',
    icon: 'headset'
  }
];

export const CASE_STUDIES = [
  {
    id: 'cs-1',
    title: 'Mandapam Junction Rooftop Solar',
    specs: '3 kW System • Kothapet, Vizianagaram',
    location: 'Shiva Temple Rd, Kothapet',
    image: '/images/installations/install-1-shiva-temple.jpg'
  },
  {
    id: 'cs-2',
    title: 'Vizianagaram Cantonment Solar Plant',
    specs: '5 kW System • Begusarai Rd, Maruthi Nagar',
    location: 'Maruthi Nagar Cantonment',
    image: '/images/installations/install-2-begusarai.jpg'
  },
  {
    id: 'cs-3',
    title: 'Pool Bagh Colony Residential Rooftop',
    specs: '3 kW System • Sai Nagar, Vizianagaram',
    location: 'Polytechnique College Rd',
    image: '/images/installations/install-3-polytechnique.jpg'
  },
  {
    id: 'cs-4',
    title: 'Santha Pet Elevated Solar Structure',
    specs: '4 kW System • Burle Peta, Kothagraharam',
    location: 'Boorlu Pet Rd, Santha Pet',
    image: '/images/installations/install-4-boorlu-pet.jpg'
  },
  {
    id: 'cs-5',
    title: 'Babameta PM Surya Ghar Installation',
    specs: '3 kW System • Dasanna Peta Main Rd',
    location: 'Jammu Narayanapuram',
    image: '/images/installations/install-5-dasanna-peta.jpg'
  },
  {
    id: 'cs-6',
    title: 'Malliveedu High-Yield Solar System',
    specs: '5 kW System • Malliveedu, AP 535161',
    location: 'Malliveedu, Andhra Pradesh',
    image: '/images/installations/install-6-malliveedu.jpg'
  },
  {
    id: 'cs-7',
    title: 'Teachers Colony Rooftop Installation',
    specs: '3 kW System • Sriramnagar, AP 535101',
    location: 'Kondapalem, Sriramnagar',
    image: '/images/installations/install-7-teachers-colony.jpg'
  },
  {
    id: 'cs-8',
    title: 'Pydimamba Temple Area Solar Setup',
    specs: '3.3 kW System • Golla St, Kothapet',
    location: 'Kothapet, Vizianagaram',
    image: '/images/installations/install-8-golla-st.jpg'
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 'subsidy-support',
    title: '100% Subsidy Assistance',
    description: 'We handle the entire PM Surya Ghar national portal registration and DBT disbursement.',
    icon: 'document'
  },
  {
    id: 'local-presence',
    title: 'Local Kothavalasa Base',
    description: 'Conveniently located near Old Railway Station, Kothavalasa for fast physical assistance.',
    icon: 'clock'
  },
  {
    id: 'safety',
    title: 'Certified Cyclone-Safe Mounts',
    description: 'High tensile hot-dip galvanized mounting structures built to withstand coastal winds.',
    icon: 'shield'
  },
  {
    id: 'sustainable',
    title: 'Lifetime Green Savings',
    description: 'Slash up to 90% off your electricity bills and enjoy free clean electricity for 25+ years.',
    icon: 'leaf'
  }
];

export const PORTFOLIO_PRODUCTS: PortfolioProduct[] = [
  {
    id: 'residential',
    title: 'PM Surya Ghar Residential Rooftop',
    subtitle: 'Rooftop Solar PV with ₹78,000 Central Subsidy for Homes & Villas',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop',
    shortDesc: 'Reliable and affordable solar systems for your home. Cut your electricity bills to near zero and gain energy freedom.',
    fullDesc: 'Geeta Solars delivers turnkey PM Surya Ghar residential solar rooftop systems with certified TopCon bifacial solar modules, smart WiFi inverters, and full APEPDCL bi-directional net-metering integration.',
    features: ['Eligible for ₹78,000 Govt DBT Subsidy', 'Bifacial Tier-1 Glass-to-Glass Panels', 'Smart Mobile App Solar Monitoring', '25-Year Linear Power Warranty'],
    specifications: [
      { label: 'Capacity', value: '1 kW - 15 kW' },
      { label: 'Payback', value: '3 to 4 Years' },
      { label: 'Subsidy', value: 'Up to ₹78,000 DBT' },
      { label: 'Warranty', value: '25 Years Linear' }
    ],
    applications: ['Independent Villas', 'Duplexes', 'Apartment Rooftops', 'Residential Societies'],
    subsidyEligible: true
  },
  {
    id: 'commercial',
    title: 'Commercial & Institutional Solar',
    subtitle: 'High-Yield Solar PV for Hospitals, Schools, Colleges & Commercial Complexes',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
    shortDesc: 'Reduce heavy commercial power tariffs, claim 40% accelerated depreciation (tax benefits), and protect your operating margins.',
    fullDesc: 'Engineered for high energy demand commercial facilities. Our commercial rooftop installations come with high-capacity string/micro-inverters, remote SCADA performance monitoring, and customized elevated mounting structures.',
    features: ['40% Accelerated Tax Depreciation', 'Heavy-Duty Elevated Structure Options', 'Real-Time SCADA Cloud Monitoring', 'Zero-Export Device Integration'],
    specifications: [
      { label: 'Capacity', value: '10 kW - 500 kW+' },
      { label: 'Tariff Offset', value: 'Up to ₹10.50 / kWh' },
      { label: 'Mounting', value: 'Galvanized Steel / Aluminium' },
      { label: 'Payback', value: '2.5 to 3.5 Years' }
    ],
    applications: ['Hospitals & Nursing Homes', 'Educational Institutions', 'Shopping Malls & Showrooms', 'Hotels & Function Halls'],
    subsidyEligible: false
  },
  {
    id: 'storage',
    title: 'Solar Home Lighting & Inverter Systems',
    subtitle: 'Off-Grid & Hybrid Solar Energy Storage with Tubular / Lithium Batteries',
    category: 'Energy Storage',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    shortDesc: 'Enjoy uninterrupted power during summer outages with smart solar home lighting, hybrid sine-wave inverters, and long-life batteries.',
    fullDesc: 'Our hybrid and home lighting solutions combine rooftop solar modules with advanced hybrid inverters and deep-cycle C10 Tubular or ultra-fast charging LiFePO4 battery banks to ensure seamless 24/7 power backup.',
    features: ['Instant Auto Power Switchover (<10ms)', 'High-Cycles LiFePO4 / Tubular Battery Options', 'Pure Sine Wave Output for Sensitive Appliances', 'Surge Protection & Overload Shield'],
    specifications: [
      { label: 'Capacity', value: '1 kVA - 20 kVA' },
      { label: 'Battery Type', value: 'Tubular C10 / LiFePO4' },
      { label: 'Backup Time', value: '4 to 16+ Hours' },
      { label: 'Efficiency', value: '> 95% MPPT Tracking' }
    ],
    applications: ['Homes with Power Cuts', 'Clinics & Diagnostic Labs', 'Petrol Pumps & Rural Outlets', 'Remote Farm Houses'],
    subsidyEligible: false
  },
  {
    id: 'industrial',
    title: 'Industrial Solar & Agro Solutions',
    subtitle: 'Megawatt-Scale Rooftop & Ground-Mounted Plants for Mills & Agro Units',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
    shortDesc: 'Custom multi-kilowatt solar power plants engineered for agro processing, cold storage, and energy-intensive manufacturing plants.',
    fullDesc: 'Tailored for industrial high-tension (HT) consumers. We handle complete turnkey EPC including substation grid-synchronization, CEIG government approvals, civil engineering, and specialized solar irrigation pump installations.',
    features: ['HT Interconnection Ready (11kV/33kV)', 'Solar Water Pump Compatibility (3HP - 10HP)', 'Dedicated Local AMC Team', 'Anti-Corrosive Industrial Mounting'],
    specifications: [
      { label: 'Capacity', value: '50 kW - 2 MW+' },
      { label: 'Generation', value: '> 1,550 kWh / kWp / yr' },
      { label: 'Structure', value: 'Anodized / HDG Steel' },
      { label: 'System Life', value: '25 to 30 Years' }
    ],
    applications: ['Rice & Flour Mills', 'Cold Storage Units', 'Agricultural Land', 'Warehouses'],
    subsidyEligible: false
  }
];

export const TRUSTED_BRANDS: PartnerBrand[] = [
  { id: 'adani', name: 'Adani Solar', subtitle: 'Tier-1 PV Modules', category: 'PV Modules', logoType: 'svg' },
  { id: 'premier', name: 'Premier Energies', subtitle: 'TopCon Technology', category: 'PV Modules', logoType: 'svg' },
  { id: 'eastman', name: 'Eastman Solar', subtitle: 'Batteries & Inverters', category: 'Batteries', logoType: 'svg' },
  { id: 'supreme', name: 'Supreme Solar', subtitle: 'Water Heaters & Thermal', category: 'Thermal', logoType: 'svg' },
  { id: 'deye', name: 'Deye / Loom', subtitle: 'Smart Hybrid Inverters', category: 'Inverters', logoType: 'svg' }
];

export const HERO_SLIDES = PORTFOLIO_PRODUCTS;
export const STATS_DATA = STATS_STRIP;

export const PM_SURYA_GHAR_DATA = {
  title: 'PM Surya Ghar: Muft Bijli Yojana',
  subtitle: 'Direct Central Government DBT Subsidy via Geeta Solars',
  slabs: [
    { capacity: '1 kW System', subsidy: '₹30,000', approxCost: '₹55,000', netCost: '₹25,000', monthlyUnits: '120 Units', idealFor: 'Small Homes / 1-2 BHK' },
    { capacity: '2 kW System', subsidy: '₹60,000', approxCost: '₹1,10,000', netCost: '₹50,000', monthlyUnits: '240 Units', idealFor: '2-3 BHK Residences' },
    { capacity: '3 kW System', subsidy: '₹78,000', approxCost: '₹1,65,000', netCost: '₹87,000', monthlyUnits: '360 Units', idealFor: '3-4 BHK / Most Popular', highlight: true },
    { capacity: 'Above 3 kW', subsidy: '₹78,000', approxCost: '₹2,15,000+', netCost: '₹1,37,000+', monthlyUnits: '500+ Units', idealFor: 'Villas & High Consumption' }
  ],
  benefits: ['Direct Bank Transfer (DBT) to Consumer', 'Up to 300 Free Units Monthly', 'Complete Paperwork Handled by Geeta Solars', 'APEPDCL Bi-directional Net Metering']
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p-1',
    title: 'PM Surya Ghar Rooftop Installation',
    category: 'Residential',
    location: 'Kothavalasa, Vizianagaram',
    capacity: '5 kW',
    annualYield: '7,500 kWh',
    co2Saved: '6.2 Tons',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    client: 'Residential Villa Owner',
    completionYear: '2025'
  },
  {
    id: 'p-2',
    title: 'Commercial Complex Solar System',
    category: 'Commercial',
    location: 'Mayuri Junction, Vizianagaram',
    capacity: '30 kW',
    annualYield: '45,000 kWh',
    co2Saved: '37 Tons',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
    client: 'Commercial Complex',
    completionYear: '2025'
  },
  {
    id: 'p-3',
    title: 'Agro Mill Solar Power Plant',
    category: 'Industrial',
    location: 'Pendurthi, Visakhapatnam',
    capacity: '75 kW',
    annualYield: '115,000 kWh',
    co2Saved: '94 Tons',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
    client: 'Agro Industry',
    completionYear: '2025'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'S. Ramana Murthy',
    role: 'Homeowner',
    location: 'Kothavalasa, Vizianagaram',
    rating: 5,
    quote: 'Geeta Solars completed our 3 kW PM Surya Ghar installation in just 4 days. The ₹78,000 subsidy was credited directly to my bank account, and our current bill is now zero!',
    systemSize: '3 kW',
    annualSavings: '₹ 42,000 / yr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'K. Srinivasa Rao',
    role: 'Commercial Building Owner',
    location: 'Mayuri Junction, Vizianagaram',
    rating: 5,
    quote: 'Best solar dealer in Vizianagaram. Transparent pricing, top quality solar panels, and great after-sales service from the local team.',
    systemSize: '15 kW',
    annualSavings: '₹ 1,80,000 / yr',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
  }
];

export const LOCATIONS_LIST = [
  'Kothavalasa (Near Old Railway Station)',
  'Mayuri Junction (Vizianagaram)',
  'Vizianagaram Town & Surroundings',
  'Pendurthi (Visakhapatnam)',
  'Visakhapatnam (Vizag)',
  'Srikakulam District',
  'Anakapalle & Bheemunipatnam',
  'Other Locations in Andhra Pradesh'
];

export const HERO_STATS = STATS_STRIP;
export const STATS_COUNTERS = STATS_STRIP.map(s => ({
  value: parseInt(s.value.replace(/[^0-9]/g, '')) || 500,
  suffix: s.value.replace(/[0-9]/g, ''),
  label: s.label,
  desc: ''
}));
export const INTRO_HIGHLIGHTS = COMMITMENT_STANDARDS.map((c, i) => ({
  number: `0${i+1}`,
  title: c.title,
  description: c.description
}));
export const SOLUTIONS_DATA: SolutionItem[] = PORTFOLIO_PRODUCTS.map(p => ({
  id: p.id,
  category: p.category,
  title: p.title,
  tagline: p.subtitle,
  description: p.shortDesc,
  image: p.image,
  stats: [{ label: 'Capacity', value: 'Custom' }],
  features: p.features
}));
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Free Site Survey & Shadow Analysis',
    description: 'Our certified solar engineers visit your property or perform 3D shadow assessment to determine exact roof load capacity, tilt orientation, and maximum sunlight capture.',
    detail: 'High-precision solar irradiance & azimuth evaluation for peak efficiency',
    duration: '1 Day',
    image: '/images/steps/step-1-survey.png'
  },
  {
    step: '02',
    title: 'Custom Engineering & Subsidy Approval',
    description: 'We generate CAD single-line drawings, structure layouts, and submit complete paperwork to the PM Surya Ghar National Portal for hassle-free sanction.',
    detail: '100% DISCOM feasibility sanction & ₹78,000 DBT approval guarantee',
    duration: '2-3 Days',
    image: '/images/steps/step-2-subsidy.png'
  },
  {
    step: '03',
    title: 'Institutional-Grade Installation',
    description: 'Our trained technicians install cyclone-safe hot-dip galvanized structures, Tier-1 Mono PERC/TopCon modules, smart inverters, and lightning protection.',
    detail: 'Complies with MNRE, CEIG, and IEEE 1547 electrical safety standards',
    duration: '1-2 Days',
    image: '/images/steps/step-3-installation.png'
  },
  {
    step: '04',
    title: 'Net-Metering & Lifetime Savings',
    description: 'We coordinate with APEPDCL / DISCOM for bidirectional net meter installation, test commissioning, and direct release of government subsidy into your bank account.',
    detail: 'Real-time mobile app IoT generation monitoring and zero power bills',
    duration: '3-5 Days',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  }
];

export const FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: 'feat-1',
    number: '01',
    title: 'Tier-1 TopCon\nSolar Modules',
    subtitle: 'High Efficiency 22.8%+',
    description: 'Bifacial glass-to-glass photovoltaic technology delivering maximum generation even in cloudy & low-light coastal conditions.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    tag: 'Hardware',
    highlight: '25-Year Linear Power Warranty'
  },
  {
    id: 'feat-2',
    number: '02',
    title: 'Cyclone-Resistant\nMounting Structures',
    subtitle: 'Built for Coastal Winds',
    description: 'Hot-dip galvanized heavy-duty structures engineered to withstand 180 km/h wind loads with zero roof penetration leaks.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
    tag: 'Engineering',
    highlight: 'Hot-Dip Galvanized & SS304 Fasteners'
  },
  {
    id: 'feat-3',
    number: '03',
    title: 'Real-Time IoT\nCloud Monitoring',
    subtitle: 'Smart Energy Dashboard',
    description: 'Track daily kWh generation, grid export, inverter status, and carbon savings in real time on iOS and Android mobile apps.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop',
    tag: 'Intelligence',
    highlight: 'WiFi / 4G Cellular IoT Inverters'
  }
];

/**
 * Solar ROI and generation calculation engine
 */
export function calculateSolarSavings(state: CalculatorState): CalculationResult {
  const { monthlyBill, propertyType } = state;
  
  let tariffPerKwh = 7.5;
  if (propertyType === 'Commercial') tariffPerKwh = 10.5;
  if (propertyType === 'Industrial') tariffPerKwh = 9.0;
  
  const monthlyUnits = monthlyBill / tariffPerKwh;
  
  let recommendedSizeKw = Math.round((monthlyUnits / 120) * 10) / 10;
  recommendedSizeKw = Math.max(1, recommendedSizeKw);
  
  const estimatedAnnualGeneration = Math.round(recommendedSizeKw * 1440);
  const estimatedAnnualSavings = Math.round(monthlyBill * 12 * 0.92);
  const estimatedMonthlySavings = Math.round(estimatedAnnualSavings / 12);
  
  const grossInvestment = Math.round(recommendedSizeKw * 52000);
  let governmentSubsidy = 0;
  if (propertyType === 'Residential') {
    if (recommendedSizeKw <= 1) governmentSubsidy = 30000;
    else if (recommendedSizeKw <= 2) governmentSubsidy = 60000;
    else governmentSubsidy = 78000;
  }
  
  const netInvestmentEstimate = Math.max(25000, grossInvestment - governmentSubsidy);
  const paybackYears = Math.round((netInvestmentEstimate / estimatedAnnualSavings) * 10) / 10;
  
  let lifetimeSavings = 0;
  let currSavings = estimatedAnnualSavings;
  for (let yr = 1; yr <= 25; yr++) {
    lifetimeSavings += currSavings;
    currSavings = currSavings * (1 - 0.005) * (1 + 0.03);
  }
  
  return {
    systemSizeKw: recommendedSizeKw,
    panelCount: Math.ceil((recommendedSizeKw * 1000) / 550),
    requiredRoofAreaSqFt: Math.round(recommendedSizeKw * 90),
    monthlyGenerationKwh: Math.round(estimatedAnnualGeneration / 12),
    annualGenerationKwh: estimatedAnnualGeneration,
    monthlySavings: estimatedMonthlySavings,
    annualSavings: estimatedAnnualSavings,
    lifetime25YearSavings: Math.round(lifetimeSavings),
    paybackYears: Math.max(2.8, Math.min(4.5, paybackYears)),
    co2OffsetTonsPerYear: Math.round((estimatedAnnualGeneration * 0.82) / 1000 * 10) / 10,
    treesEquivalent: Math.round(recommendedSizeKw * 18),
    grossInvestment,
    governmentSubsidy,
    netInvestmentEstimate,
    roiPercentage: Math.round(((estimatedAnnualSavings / netInvestmentEstimate) * 100) * 10) / 10
  };
}
