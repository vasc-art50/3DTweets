export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We needed a practical part that looked good, fit properly, and did not waste hours in trial-and-error. The process was fast, clear, and genuinely useful.',
    name: 'Workshop client',
    role: 'Prototype project',
    initials: 'WC',
  },
  {
    quote:
      'The difference was in the details: better tolerances, smarter geometry, and a final model that actually felt built for real use instead of just looking good on screen.',
    name: 'Product idea',
    role: 'Custom design',
    initials: 'PI',
  },
  {
    quote:
      'We kept iterating until the geometry and print setup matched the function. That balance saved time and made the end result much more stable in practice.',
    name: 'Print test',
    role: 'Workshop build',
    initials: 'PT',
  },
];