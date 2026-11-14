export interface Service {
  title: string;
  description: string;
  details: string[];
  format: string;
}

export const services: Service[] = [
  {
    title: '3D Design & CAD Modeling',
    description:
      'We turn sketches, references, and rough ideas into clean, printable 3D models that work in the real world.',
    details: ['Concept sketches to CAD', 'Print-ready geometry', 'Functional, compact designs'],
    format: 'Custom project · Design-led',
  },
  {
    title: 'Custom 3D Printing',
    description:
      'Reliable additive manufacturing for prototypes, replacement parts, workshop fixtures, and small production runs.',
    details: ['Prototype and functional parts', 'Material guidance', 'Short lead times'],
    format: 'Small batches · On-demand',
  },
  {
    title: 'Printer Tuning & Upgrades',
    description:
      'Hands-on calibration, maintenance advice, and practical hardware upgrades to help your printer run more consistently.',
    details: ['First-layer tuning', 'Firmware and setup advice', 'Workshop build logs'],
    format: 'Consultation · Setup support',
  },
  {
    title: 'Prototype Development',
    description:
      'We iterate quickly from concept to test print, improving fit, strength, and usability without wasting material.',
    details: ['Fast prototype loops', 'Fit and assembly checks', 'Design refinement'],
    format: 'Iterative · Design-focused',
  },
  {
    title: 'Workshop Hardware',
    description:
      'From bracketry to holders, jigs, and functional accessories, we build the parts that make a workshop more practical.',
    details: ['Custom fixtures', 'Useful add-ons', 'Problem-solving prints'],
    format: 'Practical builds · Custom fit',
  },
  {
    title: 'Product & Build Logs',
    description:
      'We document what works, what changes, and why — so the next version is easier, smarter, and faster to produce.',
    details: ['Build notes', 'Material choices', 'Improvement tracking'],
    format: 'Open project insights',
  },
];

export const servicesCs: Service[] = [
  {
    title: '3D návrh a CAD modelování',
    description: 'Z náčrtů, referencí a hrubých nápadů vytváříme přesné 3D modely připravené k tisku i praktickému použití.',
    details: ['Od konceptu k CAD modelu', 'Geometrie připravená k tisku', 'Funkční a kompaktní návrhy'],
    format: 'Zakázkový projekt · návrh na míru',
  },
  {
    title: 'Zakázkový 3D tisk',
    description: 'Spolehlivá aditivní výroba prototypů, náhradních dílů, dílenských přípravků i menších sérií.',
    details: ['Prototypy a funkční díly', 'Doporučení vhodného materiálu', 'Krátké dodací lhůty'],
    format: 'Malé série · výroba na objednávku',
  },
  {
    title: 'Seřízení a úpravy tiskáren',
    description: 'Praktická kalibrace, doporučení k údržbě a smysluplné hardwarové úpravy pro spolehlivější tisk.',
    details: ['Seřízení první vrstvy', 'Doporučení k firmwaru a nastavení', 'Zápisy z dílenských úprav'],
    format: 'Konzultace · podpora při nastavení',
  },
  {
    title: 'Vývoj prototypů',
    description: 'Rychle převádíme koncept do zkušebního výtisku a postupně ladíme rozměry, pevnost i použitelnost.',
    details: ['Rychlé prototypové iterace', 'Kontrola lícování a sestavení', 'Úpravy konstrukčního návrhu'],
    format: 'Iterativní vývoj · návrh na míru',
  },
  {
    title: 'Dílenské příslušenství',
    description: 'Navrhujeme držáky, přípravky, montážní prvky a další funkční doplňky, které zjednoduší práci v dílně.',
    details: ['Zakázkové přípravky', 'Užitečné doplňky', 'Tisk řešení konkrétních problémů'],
    format: 'Praktická řešení · přesně na míru',
  },
  {
    title: 'Dokumentace projektů',
    description: 'Zaznamenáváme ověřená řešení, změny i jejich důvody, aby další iterace byla jednodušší a rychlejší.',
    details: ['Poznámky ze stavby', 'Volba materiálů', 'Sledování vylepšení'],
    format: 'Otevřená projektová dokumentace',
  },
];
