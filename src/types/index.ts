export interface PartnerBrand {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  accentColor?: string;
  logoType: 'svg' | 'image';
  svgData?: string;
}

export interface PortfolioProduct {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  subsidyEligible?: boolean;
}

export interface SolutionItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  features: string[];
  badge?: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  detail: string;
  duration: string;
  image: string;
}

export interface FeatureCardItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  highlight: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  location: string;
  capacity: string;
  annualYield: string;
  co2Saved: string;
  image: string;
  client: string;
  completionYear: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  systemSize: string;
  annualSavings: string;
  avatar: string;
}

export interface CalculatorState {
  monthlyBill: number;
  propertyType: 'Residential' | 'Commercial' | 'Industrial';
  location?: string;
  roofType?: string;
  roofAreaSqFt?: number;
}

export interface CalculationResult {
  systemSizeKw: number;
  panelCount: number;
  requiredRoofAreaSqFt: number;
  monthlyGenerationKwh: number;
  annualGenerationKwh: number;
  monthlySavings: number;
  annualSavings: number;
  lifetime25YearSavings: number;
  paybackYears: number;
  co2OffsetTonsPerYear: number;
  treesEquivalent: number;
  grossInvestment: number;
  governmentSubsidy: number;
  netInvestmentEstimate: number;
  roiPercentage: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
}
