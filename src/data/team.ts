export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: 'Design & CAD',
    role: 'Concept development',
    bio: 'We turn sketches and rough ideas into practical 3D models designed for printability, function, and tidy assembly.',
    initials: 'DC',
  },
  {
    name: 'Prototype Lab',
    role: 'Testing & iteration',
    bio: 'Every concept is checked against real use: fit, durability, strength, and the amount of time worth spending on a print.',
    initials: 'PL',
  },
  {
    name: 'Printer Setup',
    role: 'Tuning & hardware',
    bio: 'We dial in the printer, calibrate the details, and keep the workflow steady enough to bring new ideas to life faster.',
    initials: 'PS',
  },
  {
    name: 'Workshop Notes',
    role: 'Build logs & process',
    bio: 'We learn from every test, log the decisions that matter, and keep improving the next iteration without wasting effort.',
    initials: 'WN',
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: 'Print-ready thinking',
    description:
      'Every model is designed with real manufacturing constraints in mind: strength, weight, tolerances, and a sensible amount of effort.',
  },
  {
    title: 'Practical problem-solving',
    description:
      'We focus on what actually works for the project, not on unnecessary complexity or showy design choices.',
  },
  {
    title: 'Built for iteration',
    description:
      'Good ideas improve through testing. We prototype early, learn quickly, and keep the workflow efficient from concept to print.',
  },
];

export const teamCs: TeamMember[] = [
  {
    name: 'Konstrukce a CAD',
    role: 'Vývoj konceptu',
    bio: 'Z náčrtů a prvotních představ vytváříme praktické 3D modely s ohledem na tisknutelnost, funkci i snadnou montáž.',
    initials: 'DC',
  },
  {
    name: 'Prototypová dílna',
    role: 'Testování a iterace',
    bio: 'Každý návrh ověřujeme v praxi: kontrolujeme lícování, odolnost, pevnost i to, kolik času dává smysl do tisku investovat.',
    initials: 'PL',
  },
  {
    name: 'Nastavení tiskáren',
    role: 'Ladění a hardware',
    bio: 'Kalibrujeme tiskárny a jejich detaily tak, aby byl pracovní postup spolehlivý a nové nápady šlo realizovat rychleji.',
    initials: 'PS',
  },
  {
    name: 'Dílenské zápisy',
    role: 'Dokumentace a postupy',
    bio: 'Z každého testu si odnášíme poznatky, zaznamenáváme důležitá rozhodnutí a zlepšujeme další iteraci bez zbytečné práce.',
    initials: 'WN',
  },
];

export const valuesCs: Value[] = [
  {
    title: 'Návrh připravený k tisku',
    description: 'Při konstrukci počítáme se skutečnými výrobními omezeními: pevností, hmotností, tolerancemi i přiměřenou náročností.',
  },
  {
    title: 'Praktické řešení problémů',
    description: 'Hledáme to, co projektu skutečně pomůže, ne zbytečnou složitost ani efektní řešení bez užitku.',
  },
  {
    title: 'Prostor pro další iterace',
    description: 'Dobré nápady se zlepšují testováním. Prototypujeme včas, rychle se učíme a držíme celý postup efektivní.',
  },
];
