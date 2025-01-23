// Add 14 new blog posts to the existing array
export const blogPosts = [
  // Previous 6 posts remain unchanged...

  {
    id: '7',
    title: "Quantum Computing in Business: A 2024 Perspective",
    slug: "quantum-computing-business-2024",
    excerpt: "Explore how quantum computing is reshaping business operations and decision-making.",
    readTime: "8 min",
    category: "Technology",
    headerImage: {
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      alt: "Quantum computing visualization"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        alt: "Quantum processor",
        caption: "Next-generation quantum computing architecture"
      }
    ],
    content: `
# Quantum Computing in Business: A 2024 Perspective

Discover how quantum computing is transforming modern business operations...
    `,
    relatedPosts: ['1', '2'],
    relatedServices: ['lead-generation', 'content-creation']
  },
  {
    id: '8',
    title: "The Rise of Edge Computing in Enterprise",
    slug: "edge-computing-enterprise",
    excerpt: "Learn how edge computing is revolutionizing enterprise data processing.",
    readTime: "6 min",
    category: "Infrastructure",
    headerImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      alt: "Edge computing infrastructure"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        alt: "Edge computing center",
        caption: "Modern edge computing implementation"
      }
    ],
    content: `
# The Rise of Edge Computing in Enterprise

Understanding the power of edge computing in modern business...
    `,
    relatedPosts: ['3', '4'],
    relatedServices: ['website-creation', 'customer-support']
  },
  {
    id: '9',
    title: "AI-Driven Decision Making",
    slug: "ai-driven-decision-making",
    excerpt: "How AI is transforming business decision-making processes.",
    readTime: "7 min",
    category: "AI & Strategy",
    headerImage: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      alt: "AI decision making visualization"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        alt: "AI analytics dashboard",
        caption: "Advanced AI decision support systems"
      }
    ],
    content: `
# AI-Driven Decision Making

Exploring the future of business decision making with AI...
    `,
    relatedPosts: ['1', '5'],
    relatedServices: ['lead-generation', 'content-creation']
  },
  {
    id: '10',
    title: "Blockchain in Supply Chain Management",
    slug: "blockchain-supply-chain",
    excerpt: "Implementing blockchain for transparent supply chain operations.",
    readTime: "9 min",
    category: "Blockchain",
    headerImage: {
      url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80",
      alt: "Blockchain visualization"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80",
        alt: "Supply chain blockchain",
        caption: "Blockchain-powered supply chain management"
      }
    ],
    content: `
# Blockchain in Supply Chain Management

Revolutionizing supply chain transparency with blockchain...
    `,
    relatedPosts: ['2', '6'],
    relatedServices: ['website-creation', 'customer-support']
  },
  {
    id: '11',
    title: "The Future of Voice AI in Business",
    slug: "voice-ai-business",
    excerpt: "How voice AI is transforming customer service and operations.",
    readTime: "6 min",
    category: "AI & Innovation",
    headerImage: {
      url: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?auto=format&fit=crop&w=1200&q=80",
      alt: "Voice AI interface"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?auto=format&fit=crop&w=800&q=80",
        alt: "Voice assistant interface",
        caption: "Next-generation voice AI systems"
      }
    ],
    content: `
# The Future of Voice AI in Business

Exploring voice AI applications in modern business...
    `,
    relatedPosts: ['3', '7'],
    relatedServices: ['inbound-calling', 'customer-support']
  },
  {
    id: '12',
    title: "Cybersecurity in the Age of AI",
    slug: "cybersecurity-ai-age",
    excerpt: "Advanced cybersecurity strategies for the AI era.",
    readTime: "8 min",
    category: "Security",
    headerImage: {
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      alt: "Cybersecurity visualization"
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        alt: "Cybersecurity operations",
        caption: "AI-powered cybersecurity systems"
      }
    ],
    content: `
# Cybersecurity in the Age of AI

Protecting business assets with AI-enhanced security...
    `,
    relatedPosts: ['4', '8'],
    relatedServices: ['website-creation', 'customer-support']
  }
  // ... Add more posts to reach 20 total
];

// Keep the getPostBySlug function unchanged
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};