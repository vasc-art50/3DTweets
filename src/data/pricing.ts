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
    highlighted: false,
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
    highlighted: false,
  },
];

export const plansCs: Plan[] = [
  {
    name: 'Zakázkový tisk',
    price: 'Od 40 €',
    period: 'za projekt',
    description: 'Rychlý a přímočarý 3D tisk jednoho dílu, zkušebního vzorku nebo malé funkční série.',
    features: ['Doporučení materiálu a nastavení tisku', 'Jednotlivé kusy i malé série', 'Praktická kontrola lícování a tisknutelnosti'],
    highlighted: true,
  },
  {
    name: 'Návrh a prototyp',
    price: 'Od 120 €',
    period: 'za koncept',
    description: 'Promyšlená cesta od nápadu přes 3D model až k vytištěnému prototypu a jeho praktickému doladění.',
    features: ['CAD modelování a zpřesnění konceptu', 'Iterace prototypu a zkoušky tisku', 'Úpravy pro vyšší pevnost a použitelnost', 'Jasná doporučení pro realizaci'],
    highlighted: false,
  },
  {
    name: 'Vývoj produktu',
    price: 'Individuálně',
    period: 'nabídka na míru',
    description: 'Pro rozsáhlejší vývoj produktu, funkční sestavy nebo podrobnější řešení pro dílnu.',
    features: ['Kompletní návrh a prototypování', 'Ladění tisku a výběr materiálu', 'Iterace podle testů v reálném provozu', 'Dokumentace pro další úpravy'],
    highlighted: false,
  },
];
