import { MessageCircle, Globe, Users, PhoneCall, Calendar, Pencil, Shield } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  packages: Package[];
  isFullWidth?: boolean;
  isCustomService?: boolean;
}

export interface Package {
  name: string;
  price: string;
  billingPeriod: string;
  setupFee?: string;
  features: string[];
  highlight?: string;
}

const modStartupFeatures = [
  'AI Lead Generation System',
  'Basic Website Creation',
  'Email Automation',
  'Customer Support Chatbot',
  'CRM Integration',
  'Basic Analytics Dashboard',
  'Weekly Strategy Calls',
  'Emergency Response Team'
];

const modPremiumFeatures = [
  'Everything in STARTUP, plus:',
  'Advanced AI Lead Intelligence',
  'Multi-Channel Lead Generation',
  'Custom Website with AI Integration',
  '24/7 AI Support System',
  'Advanced Analytics & Reporting',
  'Automated Social Media Management',
  'Priority Emergency Response',
  'Dedicated Survival Specialist'
];

const modScaleFeatures = [
  'Everything in PREMIUM, plus:',
  'Custom AI Models & Integration',
  'Enterprise-Grade Infrastructure',
  'Predictive Lead Analytics',
  'AI Voice Calling System',
  'White-Label Solutions',
  'API Access & Custom Development',
  'Elite Emergency Response Team',
  'Direct Line to Command Center'
];

export const services: Service[] = [
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'AI-driven solutions to find and qualify leads faster than ever.',
    icon: Users,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'website-creation',
    title: 'Website Creation',
    description: 'Custom, AI-powered websites designed to convert.',
    icon: Globe,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    description: '24/7 AI-powered chat support to delight your customers.',
    icon: MessageCircle,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'inbound-calling',
    title: 'Inbound Calling Assistant',
    description: 'AI-powered voice assistant to handle your inbound calls.',
    icon: PhoneCall,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'appointment-scheduling',
    title: 'Appointment Scheduling',
    description: 'Save time with automated calendar management for you and your clients.',
    icon: Calendar,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Generate high-quality, engaging content at scale with AI.',
    icon: Pencil,
    packages: [
      {
        name: 'MOD STARTUP',
        price: '$994',
        billingPeriod: 'one-time',
        features: modStartupFeatures
      },
      {
        name: 'MOD PREMIUM',
        price: '$797',
        billingPeriod: 'month',
        setupFee: '$1,294',
        features: modPremiumFeatures,
        highlight: 'Most Popular'
      },
      {
        name: 'MOD SCALE',
        price: '$2,297',
        billingPeriod: 'month',
        setupFee: '$4,997',
        features: modScaleFeatures
      }
    ]
  },
  {
    id: 'full-survival-kit',
    title: 'Full Survival Kit',
    description: 'Your Ultimate AI-Powered Survival Plan for Business Dominance',
    icon: Shield,
    isFullWidth: true,
    isCustomService: true,
    packages: []
  }
];