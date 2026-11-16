# 3DTweets — podklad pro manuál Pages CMS

Tento přehled popisuje konfiguraci, která je právě v pracovním stromu repozitáře. Cesty a ukázky jsou převzaté ze zdrojových souborů; provozní časy ani chování externí aplikace Pages CMS, které repozitář nekonfiguruje, nejsou odhadovány.

## 1. Co se zobrazuje v Pages CMS

`.pages.yml` obsahuje čtyři položky typu `collection` v tomto pořadí. Neobsahuje samostatné položky typu `file` ani další skupiny.

| Pořadí | Přesný popisek (`label`) | Technický název (`name`) | Cesta v repozitáři |
|---:|---|---|---|
| 1 | Blog (EN) | `blog` | `src/content/blog` |
| 2 | Blog (CS) | `blog-cs` | `src/content/blog-cs` |
| 3 | TweetONE Dokumentace (CS) | `tweetone-cs` | `src/content/tweetone/cs` |
| 4 | TweetONE Documentation (EN) | `tweetone-en` | `src/content/tweetone/en` |

Všechny čtyři kolekce používají `format: yaml-frontmatter`. Blogy vytvářejí nové soubory podle `"{fields.title}.md"`, dokumentace TweetONE podle `"{title}.md"`. V každé kolekci je `operations.rename: false`; existující názvy souborů tedy CMS nemá přejmenovávat. Jazyk je určen složkou a samostatnou kolekcí, nikoli jazykovým polem ve frontmatteru.

### Blog EN a Blog CS

Obě kolekce mají shodná pole. U běžných blogových polí není `label` výslovně nastaveno v YAML; přesná hodnota `name` je uvedena níže. U pole `category` jsou nastavené popisky jednotlivých voleb.

| `name` | `label` v YAML | Typ | Povinné | Další nastavení |
|---|---|---|---|---|
| `title` | neuveden | `string` | ano | — |
| `description` | neuveden | `text` | ano | — |
| `pubDate` | neuveden | `date` | ano | Formát `yyyy-MM-dd` |
| `updatedDate` | neuveden | `date` | ne | Formát `yyyy-MM-dd` |
| `tags` | neuveden | `string` | `required` neuvedeno | `list: true`, výchozí `[]` |
| `category` | neuveden | `select` | `required` neuvedeno | Výchozí hodnota `projects` |
| `printablesUrl` | neuveden | `string` | ne | URL stránky modelu/tisku |
| `author` | neuveden | `string` | ne | — |
| `printSpecs` | neuveden | `object` | ne | Vnořená pole jsou níže |
| `heroImage` | neuveden | `image` | ne | Rozšíření: `avif`, `jpg`, `jpeg`, `png`, `webp`; přejmenování uploadu vypnuté |
| `galleryFolder` | neuveden | `string` | ne | Složka pod `src/assets`, např. `models/henrys-shave` |
| `gallery` | neuveden | `image` | ne | `multiple: true`; stejná rozšíření jako `heroImage`; přejmenování vypnuté |
| `body` | neuveden | `rich-text` | `required` neuvedeno | Markdown; přejmenování médií vypnuté |

`printSpecs` obsahuje tato volitelná vnořená pole (u všech je `label` neuveden a `required: false`):

| `name` | `label` | Typ |
|---|---|---|
| `material` | neuveden | `string` |
| `layerHeight` | neuveden | `string` |
| `infill` | neuveden | `string` |
| `supports` | neuveden | `string` |

Kategorie ukládají do frontmatteru technickou hodnotu `name`; v EN a CS kolekci se liší pouze jejich zobrazovaný `label`:

| Ukládaná hodnota | Blog (EN) | Blog (CS) |
|---|---|---|
| `projects` | Projects & Guides | Projekty & Návody |
| `our-models` | Our Models | Naše modely |
| `showcase` | Showcase | Oblíbené tisky |
| `TweetONE` | TweetONE | TweetONE |

`src/content.config.ts` validuje `category` právě hodnotami `projects`, `our-models`, `showcase`, `TweetONE` a při vynechání použije `projects`. `printablesUrl` je v CMS typu `string`, ale Astro schéma jej validuje jako URL; zadávejte proto úplnou platnou URL. EN a CS články jsou samostatné soubory, jejich překlad se automaticky nevytváří.

### TweetONE Dokumentace (CS) a TweetONE Documentation (EN)

Obě kolekce mají shodnou strukturu a liší se lokalizovanými popisky. V následujících tabulkách je u každého pole uvedeno `name`, přesné `label`, typ a nastavení povinnosti.

| `name` | `label` (CS) | `label` (EN) | Typ | Povinné / výchozí hodnota |
|---|---|---|---|---|
| `eyebrow` | Nadpis štítku | Section eyebrow | `string` | ano |
| `title` | Nadpis sekce | Section heading | `string` | ano |
| `order` | Pořadí sekce | Section order | `number` | ano |
| `layout` | Typ rozložení | Section layout type | `select` | ne, výchozí `cards` |
| `altBackground` | Střídavé pozadí sekce | Use alternating section background | `boolean` | ne, výchozí `false` |
| `highlightBox` | Úvodní karta Fáze 0 | Phase 0 highlight card | `object` | ne |
| `cards` | Karty sekce | Section cards | `object`, `list: true` | ne |
| `links` | Odkazy na zdroje | Reference links | `object`, `list: true` | ne |
| `body` | Text sekce (Markdown) | Section body (Markdown) | `rich-text` | `required` neuvedeno; Markdown |

Přesné volby pro `layout` jsou `overview`, `setup`, `hardware`, `cards`, `reference`. Další výběrové pole je `cards[].column`, s volbami `is-6` a `is-12` a výchozí hodnotou `is-6`.

Vnořený objekt `highlightBox` má následující pole:

| `name` | `label` (CS) | `label` (EN) | Typ | Povinné |
|---|---|---|---|---|
| `eyebrow` | Štítek karty | Card eyebrow | `string` | ano |
| `goal` | Cíl | Goal | `text` | ano |
| `experiment` | Test | Experiment | `text` | ano |
| `result` | Výsledek | Result | `text` | ano |

Každý prvek `cards` je objekt. Všechna tato vnitřní pole mají `required: false`:

| `name` | `label` (CS) | `label` (EN) | Typ / další nastavení |
|---|---|---|---|
| `eyebrow` | Štítek karty | Card eyebrow | `string` |
| `title` | Nadpis karty | Card heading | `string` |
| `date` | Datum nebo období | Date or period | `string` |
| `text` | Text karty | Card text | `text` |
| `cause` | Příčina problému | Problem cause | `text` |
| `fix` | Řešení problému | Problem fix | `text` |
| `fixPrefix` | Začátek řešení před kódem | Fix text before inline code | `text` |
| `inlineCode` | Krátký kód v řešení | Inline code in fix | `string` |
| `fixSuffix` | Konec řešení za kódem | Fix text after inline code | `text` |
| `items` | Položky seznamu | List items | `string`, `list: true` |
| `code` | Konfigurační nebo terminálový kód | Configuration or terminal code | `text` — víceřádkový text |
| `column` | Šířka karty v řádku | Card width in row | `select`; výchozí `is-6`; hodnoty `is-6`, `is-12` |

Každý prvek `links` je objekt se dvěma povinnými poli:

| `name` | `label` (CS) | `label` (EN) | Typ | Povinné |
|---|---|---|---|---|
| `label` | Text odkazu | Link text | `string` | ano |
| `url` | URL odkazu | Link URL | `string` | ano |

V `.pages.yml` je `links[].url` formulářové pole typu `string`; `src/content.config.ts` jej navíc validuje jako URL. Pole `body` je tělo Markdown souboru spravované rich-text editorem, nikoli další položka frontmatteru.

V TweetONE schématu nejsou další výběrová pole ani jiné typy, než které Pages CMS podporuje. Pole `cards[].code` je v konfiguraci `text`; frontmatter jej ukládá jako řetězec, obvykle pomocí YAML bloku `|`.

## 2. Příklady skutečných souborů

### Blog: `src/content/blog/henrys-shave-medieval-pedestal.md`

Kompletní současný článek včetně celé YAML hlavičky:

````md
---
title: "Henry's Shave: Medieval Pedestal for Philips OneBlade"
description: "A medieval-inspired, practical home for the Philips OneBlade, with
  a nod to Bohemian history and Kingdom Come: Deliverance II."
pubDate: 2026-11-15
tags:
  - 3d-printing
  - Philips-OneBlade
  - Henry's-Shave
category: our-models
printablesUrl: https://www.printables.com/model/1624431-henrys-shave-medieval-pedestal-for-philips-oneblad
author: Frank
printSpecs:
  material: Prusament PLA Galaxy Black / Marble Grey
  layerHeight: 0.20 mm
  infill: 15 % Gyroid
  supports: Bez podpěr / No supports
heroImage: ../../assets/models/henrys-shave/20260304_175705.webp
galleryFolder: models/henrys-shave
---
The bathroom is a modern room, but it does not have to feel anonymous. **Henry's Shave** gives the Philips OneBlade a small, medieval-inspired pedestal—an everyday object with a little of the atmosphere of Bohemia's past and the world of *Kingdom Come: Deliverance II*.

## A practical place for a modern razor

The pedestal keeps the OneBlade upright and easy to reach instead of leaving it loose on the sink. Its open form leaves room for water to drain away and for the handle to dry, while giving the bathroom a tidier place to keep it between uses.

That mix of old and new is the point: a contemporary grooming tool gets a home that feels more like a tiny piece of carved stonework than another generic bathroom accessory.

## Printing with a stone or metal character

The suggested starting point is a 0.20 mm layer height, 15% Gyroid infill, and no supports. Prusament PLA Marble Grey gives the pedestal a stone-like feel; Galaxy Black makes a darker, more dramatic version. For a metallic look, try a dark filament and bring out the raised details with a light dry-brush finish after printing.

These settings are a practical starting point rather than a substitute for checking your own printer and filament profile.

## Get the model

Download the [Henry's Shave pedestal on Printables](https://www.printables.com/model/1624431-henrys-shave-medieval-pedestal-for-philips-oneblad), or browse [Václav's other models](https://www.printables.com/@Vaclav_757444/models).
````

### TweetONE: `src/content/tweetone/en/03-hardware-bom.md`

Tento kompletní soubor ukazuje YAML frontmatter pro karty a HTML tabulku v těle dokumentu:

````md
---
eyebrow: Hardware & BOM
title: Profile sizes, rails, and motion hardware
order: 3
layout: hardware
altBackground: false
cards:
  - eyebrow: Additional hardware
    column: is-6
    items:
      - THK SRS 12GN linear rail (310 mm) for the X axis
      - MGN9H / MGN12H rails for the Y axis
      - F623RS bearings and 2GT belts
      - Brass heat-set inserts for structural joints
      - POM anti-backlash nuts for the Z screws
  - eyebrow: Practical note
    column: is-6
    text: The most important design decision was moving away from V-wheels and toward linear motion, better-defined alignment, and stiffer gantry geometry. That allowed the printer to keep a good balance between speed and repeatability.
---

<table class="table is-fullwidth is-striped is-narrow">
  <thead>
    <tr>
      <th>Component</th>
      <th>Qty</th>
      <th>Origin</th>
      <th>Use in TweetONE</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>4040 profile (290 mm)</td><td>4</td><td>Ender 3 + Ender 3 V2</td><td>Lower rectangular frame</td><td>Very stiff base geometry</td></tr>
    <tr><td>2040 profile (400 mm)</td><td>4</td><td>Ender 3 + Ender 3 V2</td><td>Main vertical frame members</td><td>Maintains full print height</td></tr>
    <tr><td>2040 profile (350 mm)</td><td>2</td><td>Added / modified Y-axis</td><td>Linear rail guides</td><td>Validated against Y-axis geometry</td></tr>
    <tr><td>2020 profile (300 mm)</td><td>1</td><td>Top bridge</td><td>X gantry cross member</td><td>Trimmed for exact 300 mm length</td></tr>
    <tr><td>2020 profile (350 mm)</td><td>3</td><td>Added / reused</td><td>Triple-Z rail support</td><td>Used for the Z-axis layout</td></tr>
  </tbody>
</table>
````

Další skutečné zápisy ukazují, jak zachovat víceřádkový konfigurační text, odkazy a úvodní kartu. V editoru CMS je `code` pole typu `text`; struktura YAML používá `|`:

````yaml
cards:
  - eyebrow: system.cfg
    column: is-6
    code: |
      WIFI_SSID="YourHomeWiFi"
      WIFI_PASSWD="VerySecretPassword"
      hostname="TweetONE-M"
````

Odkazy jsou samostatné položky v seznamu `links`:

```yaml
links:
  - label: Irbis3D Duender CoreXY
    url: https://www.youtube.com/@Irbis3D
```

Speciální karta Phase 0 je v `01-overview.md` objektem `highlightBox`:

```yaml
highlightBox:
  eyebrow: Phase 0
  goal: Prove that one Raspberry Pi 4B can run dual-MCU Klipper reliably.
  experiment: Connect both Creality v4.2.2 boards at once over USB.
  result: Stable XY and independent Triple-Z control before the mechanical rebuild began.
```

## 3. Obrázky, Save a nasazení

### Kam CMS ukládá obrázky

Globální media konfigurace v `.pages.yml` je:

- vstupní složka: `src/assets/models`
- cesta zapisovaná do obsahu: `../../assets/models`
- `rename: false`
- povolená rozšíření: `avif`, `jpg`, `jpeg`, `png`, `webp`

Blogová pole `heroImage` a `gallery` i obrázky vložené do `body` používají tento zdroj médií. Cesta `../../assets/models/...` je relativní k Markdown souboru v `src/content/blog` nebo `src/content/blog-cs`. Galerie může místo seznamu cest použít `galleryFolder` pod `src/assets`, například `models/henrys-shave`; komponenta pak načítá obrázky z dané složky.

### Co dělá optimalizace

`scripts/optimize-images.mjs` se zaměřuje pouze na změněné soubory ve `src/assets/models`. Zpracovává `.jpg`, `.jpeg` a `.png` (ne AVIF ani již existující WebP), podle EXIF obrázek otočí, zmenší jej nejvýše na rozměr 1600 × 1600 px při zachování poměru stran a bez zvětšování menších obrázků, uloží WebP v kvalitě 82, upraví odpovídající cesty ve všech `src/content/**/*.md` a smaže originál. Nepřepisuje již existující WebP a odmítá symbolické odkazy.

Toto převádí zdrojové soubory v repozitáři. Nezaměňovat s build optimalizací: `ModelGallery.astro` navíc při Astro buildu vytváří plné WebP obrázky s maximálním rozměrem 1600 px a náhledy 300 px (kvalita 75). To samo o sobě zdrojové soubory v GitHubu nepřepisuje.

`public/` není vstupem uploadů Pages CMS ani automatizace. Obsahuje jiné statické obrázky a favicony; workflow je mimo povolenou cestu, a proto je nemaže ani nepřejmenovává.

### Co lze říct o publikování po Save

V repozitáři není uvedena cílová větev, kterou má aplikace Pages CMS při Save použít. Určuje ji nastavení připojeného repozitáře v Pages CMS. Workflow však reagují pouze na větev `main`:

1. Push do `main` spustí `.github/workflows/main.yml`: nastaví Node 24 a pnpm 10, nainstaluje závislosti příkazem `pnpm install --frozen-lockfile`, spustí `pnpm build`, nahraje `dist` a nasadí GitHub Pages. Astro `site` je nastaveno na `https://3dtweets.com`.
2. Push změny v `src/assets/models/**` do `main` navíc spustí `.github/workflows/optimize-images.yml`. Po konverzi workflow zapíše WebP a změněný Markdown zpět do `main` a explicitně vyvolá nový `workflow_dispatch` hlavního produkčního workflow.
3. Protože hlavní workflow reaguje na každý push do `main`, commit s novým obrázkem může spustit build také před dokončením optimalizace; po optimalizačním commitu je vyžádán další build. Ten publikuje výsledný WebP obsah.
4. Workflow nemají nastavenou pevnou dobu nasazení ani časovou garanci. Konkrétní průběh a čekání se ověřuje v GitHub Actions; z kódu nelze slíbit přesný čas dostupnosti na doméně.

Angličtina a čeština se neupravují automatickým překladem. Blog má kolekce `blog` a `blog-cs`; TweetONE má oddělené kolekce `tweetone-en` a `tweetone-cs`, každou se sedmi soubory. Astro používá výchozí jazyk EN bez prefixu a český prefix `/cs/`; stránky TweetONE vybírají složku `en/` nebo `cs/` a řadí sekce podle pole `order`.

## 4. Co upravit v CMS a co přes VS Code

### Přímo přes Pages CMS

- **Blogové články:** vytvářet a upravovat EN a CS články v odpovídající kolekci. CMS nabízí metadata, kategorie, parametry tisku, obrázky, galerii a Markdown rich-text tělo.
- **TweetONE dokumentaci:** upravovat samostatné sekce EN a CS, jejich pořadí, styl pozadí, layout, karty, seznamy, víceřádkový konfigurační text, odkazy a Markdown tělo.
- Změna titulku existující položky nemá přejmenovat její soubor, protože je `rename` vypnuté. Překlad je třeba uložit do kolekce druhého jazyka.

V `.pages.yml` nejsou položky pro úvodní stránku, O nás, služby, ceny, tým, reference, navigaci, CSV ani styl stránky.

### Vyžaduje zásah vývojáře ve VS Code

| Obsah nebo chování | Zdroj v projektu |
|---|---|
| Hlavní navigace a překlady UI (EN/CS) | `src/i18n/ui.ts`; vykresluje ji `src/components/NavBar.astro` |
| Texty a struktura domovské stránky | `src/pages/index.astro`, `src/pages/cs/index.astro` |
| Obecné údaje webu (název, e-mail, adresa, URL) | `src/data/site.ts` |
| Služby | `src/data/services.ts` |
| Cenové plány | `src/data/pricing.ts` |
| Tým a hodnoty | `src/data/team.ts` |
| Reference / ukázky | `src/data/testimonials.ts` |
| Tabulky materiálů | `src/data/en/materials.csv`, `src/data/cs/materials.csv`; načítá je `src/components/MaterialsList.astro` |
| Designové tokeny a Bulma Sass | `src/assets/styles/main.scss` a styly jednotlivých komponent |
| URL routy, schémata obsahu a validace Markdown frontmatteru | `src/pages/`, `src/content.config.ts`, `astro.config.mjs` |

Materiálové CSV očekávají sloupce `name,manufacturer,type,description`. Stránky je parsují při buildu, takže je třeba zachovat jejich hlavičku a počet polí. Změny tras, formulářů, rozložení nebo CSS nejsou editací textu v Pages CMS; vyžadují odpovídající změnu komponent a následný build.

### Projektové prostředí

`package.json` vyžaduje Node `>=22.22.0`; `.nvmrc` obsahuje `24.22.1`. Závislosti jsou spravovány pnpm a `pnpm-lock.yaml`. Astro má výchozí locale `en`, locale `cs` a `prefixDefaultLocale: false`.
