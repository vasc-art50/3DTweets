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
