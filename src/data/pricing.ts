export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Custom Print',
    price: 'From €40',
    period: 'per project',
    description: 'Fast, straightforward 3D printing for a part, test piece, or small functional batch.',
    features: ['Material and print setup guidance', 'One-off or short-run production', 'Practical fit and print review'],
    highlighted: true,
  },
  {
    name: 'Design + Prototype',
    price: 'From €120',
    period: 'per concept',
    description: 'A smarter path from idea to 3D model, printed prototype, and a practical improvement loop.',
    features: [
      'CAD modeling and concept refinement',
      'Prototype iteration and print testing',
      'Design tweaks for strength and usability',
      'Clear build recommendations',
    ],
    highlighted: true,
  },
  {
    name: 'Product Development',
    price: 'Custom',
    period: 'tailored quote',
    description: 'For more involved product work, functional assemblies, or deeper workshop-focused development.',
    features: [
      'Full design and prototype workflow',
      'Print tuning and material selection',
      'Iteration based on real-world testing',
      'Documentation for future revisions',
    ],
    highlighted: true,
  },
];
