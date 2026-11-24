# 3DTweets — technický přehled a Pages CMS

Tento přehled popisuje konfiguraci, která je právě v pracovním stromu repozitáře. Cesty a ukázky jsou převzaté ze zdrojových souborů; provozní časy ani chování externí aplikace Pages CMS, které repozitář nekonfiguruje, nejsou odhadovány.

## 1. Architektura a tech stack

Web je staticky generovaný pomocí Astro. Hlavní stack tvoří Astro (`^7.4.1`), Bulma (`^1.0.4`) se Sass, `astro-pagefind`, Astro RSS a sitemap integrace, Sharp a TypeScript (`^6.0.3`). Styly se sestavují z `src/assets/styles/main.scss`; Bulma se importuje po modulech přes Sass `@use` a projektové styly používají prefix `aw-`. Zvýrazňování syntaxe Astro je vypnuté. Konfigurace je v `astro.config.mjs`, balíčky v `package.json`.

### Mapa projektu

- `src/pages/` — EN stránky bez prefixu, české protějšky pod `cs/`, dynamické detaily blogu (`[...slug].astro`), RSS endpointy a vlastní 404 stránky.
- `src/content/` — Markdown články `blog/` a `blog-cs/`; dokumentace TweetONE v `tweetone/en/` a `tweetone/cs/`.
- `src/components/` — sdílené UI včetně `NavBar.astro`, `ThemeToggle.astro` a `LanguageSwitch.astro`; `blog/` obsahuje rubriky, filtr, feed a galerii, `seo/` strukturovaná data.
- `src/layouts/BaseLayout.astro` — společný HTML dokument, metadata, hlavička, patička, Pagefind oblast, JSON-LD a volitelný produkční Cloudflare Web Analytics beacon.
- `src/assets/styles/main.scss` — Bulma importy, globální typografie, responzivní styly a theme-aware `--aw-*` tokeny; `src/assets/models/` obsahuje zdrojové modelové obrázky.
- `src/i18n/` — slovník `ui.ts` a mapování URL v `utils.ts`.
- `src/data/` — údaje webu, služeb, cen, týmu, referencí a lokalizované CSV materiálů.
- `src/utils/` a `scripts/` — pomocné funkce pro obsah, Markdown a optimalizaci obrázků.
- `.github/workflows/` — produkční build/deploy a optimalizace nahraných modelových obrázků.
- `public/` — přímo kopírované statické soubory včetně `robots.txt`, `llms.txt`, ikon, OG obrázku a `_headers`.

### Motiv a lokalizace

Astro i sitemap používají `en` jako výchozí jazyk bez prefixu a `cs` s prefixem `/cs/`. UI texty jsou ve slovníku `src/i18n/ui.ts`. `localeSwitchUrl()` v `src/i18n/utils.ts` zachová cestu jen pro známé lokalizované routy; u ostatních přepne na úvodní stránku cílového jazyka.

`BaseLayout.astro` nastaví `data-theme` ještě před prvním vykreslením: použije uloženou volbu `theme` z `localStorage`, jinak systémové `prefers-color-scheme` (bez preference je výchozí světlý motiv). `ThemeToggle.astro` přepíná a ukládá motiv a znovu jej synchronizuje po `astro:page-load`. Základní barvy motivů vycházejí ze sdílených CSS proměnných; jazyková pilulka má vlastní barvy a stíny pro oba motivy.

Pod 1024 px jsou v `.navbar-brand` za logem a vyhledáváním trvale viditelné přepínač motivu, jazykový přepínač a hamburger v tomto pořadí; na desktopu jsou přepínače za CTA tlačítkem v navigaci. `ThemeToggle.astro` vykresluje tlačítka `[data-theme-toggle]` bez pevných ID. `LanguageSwitch.astro` obsahuje neklikací popisky EN/CZ a odkaz `.aw-lang-pill` s glóbem pro EN nebo českou vlajkou pro CS; mobilní a desktopový `clipPath` mají různá ID.

### Hlavní routy a integrace

EN routy zahrnují `/`, `/about/`, `/services/`, `/tweetone/`, `/contact/`, `/blog/`, `/blog/<slug>/` a `/search/`; jejich české verze jsou pod `/cs/`. K dispozici jsou také `/rss.xml` a `/cs/rss.xml`. `404.astro` a `cs/404.astro` dodávají vlastní stránky nenalezené adresy. Sitemap generuje `@astrojs/sitemap`; `public/robots.txt` a `public/llms.txt` jsou statické soubory, nikoli Astro routy.

`astro-pagefind` vytváří index při buildu; společný obsah stránky je označen `data-pagefind-body` a obě search stránky používají lokalizovaný Pagefind komponent. Kontakt je statický formulář odesílaný přes `fetch` na Web3Forms (`https://api.web3forms.com/submit`); serverová část v tomto projektu není. Přístupový klíč formuláře nepatří do této dokumentace.

Oficiální YouTube kanál je https://www.youtube.com/channel/UCsNenKWa07G8v30aRlqicUw; jeho URL spolu s e-mailem spravuje `src/data/site.ts`. `ContactLink.astro` vykresluje odkazy s ikonami ve sdílené patičce a na stránce Kontakt pro oba jazyky. URL kanálu je také v JSON-LD `sameAs` společně s Printables profilem.

`StructuredData.astro` vytváří JSON-LD `Organization`/`ProfessionalService`; články přidávají `BlogPosting`/`TechArticle` a modelové články mohou přidat `CreativeWork`. `BaseLayout.astro` dále skládá canonical, hreflang, Open Graph, Twitter a RSS metadata. `public/_headers` obsahuje pravidla pro hosty, kteří podporují formát Netlify `_headers`; ověřte podporu cílového hostingu před spoléháním se na tyto hlavičky.

Cloudflare Web Analytics se v `BaseLayout.astro` vkládá jako inline nezpracovaný beacon pouze při produkčním buildu s neprázdným `PUBLIC_CF_BEACON_TOKEN`. Deploy workflow předává hodnotu repository variable, případně výchozí token; lokální vývoj beacon nevkládá.

## 2. Content Collections a Pages CMS — datový kontrakt

Astro definuje tři kolekce: `blog`, `blogCs` a `tweetone` v `src/content.config.ts`. Pages CMS definuje čtyři editovatelné kolekce: EN/CS blog a EN/CS TweetONE. Obsah TweetONE proto má v Astro jednu společnou kolekci s jazykovými složkami, i když CMS nabízí samostatné kolekce. Podrobný seznam polí, typů, CMS popisků a ukázkové frontmatter hlavičky je v části **Detailní reference Pages CMS** níže.

Blog vyžaduje `title`, `description` a `pubDate`; `updatedDate`, `printablesUrl`, `author`, `printSpecs`, `heroImage`, `galleryFolder` a `gallery` jsou volitelné. `tags` mají výchozí `[]`, `category` výchozí `projects` a autor `3DTweet team`. Pole `images` schéma ani Pages CMS nedefinují; seznam snímků se zapisuje do `gallery`, případně se načítá z `galleryFolder`. `printablesUrl` validuje Astro jako URL. TweetONE odkazy jsou nyní běžné Markdown odkazy v těle a jejich URL kontroluje obsahová revize, nikoli schéma polí. Tělo Markdownu spravuje rich-text pole CMS, není to další položka frontmatteru.

Platné kategorie blogu jsou výhradně `projects` / `Projects & Guides` / `Projekty & Návody`, `our-models` / `Our Models` / `Naše modely` a `TweetONE`. Kategorie `Showcase` je zrušená; v kontrolovaném obsahu nejsou články, které by ji používaly. Změny schématu musí být sladěny v `src/content.config.ts`, obou blogových polích `.pages.yml`, překladech v `src/i18n/ui.ts` a komponentách filtrování/karet. Nepřidávejte hodnotu do CMS bez odpovídající validace a vykreslení.

## 3. Skryté funkční závislosti

- **Blogový filtr a navigace detailu:** sdílený `BlogPostNavigation.astro` vykresluje hned pod hlavní navigací kompaktní celoplošný pás `.aw-hero` s diagonální texturou, spodním okrajem a lokalizovaným dvoubarevným nadpisem (PROJECT JOURNAL — Notes from the workshop. / Zápisník z dílny — Poznámky z našich projektů) převzatým z blogového indexu. Nadpis a flex-wrap pilulky zarovnává `.container`; jeho vnější odsazení sdílí stejné Sass proměnné s `.aw-section` článku na všech šířkách. Kategorie vybírají aktivní rubriku z `post.data.category` a vedou na `/blog/?category=<slug>` nebo `/cs/blog/?category=<slug>`. Sdílený `CategoryFilter.astro` používá hodnoty `projects`, `our-models` a `TweetONE`, aplikuje query parametr při načtení, navigaci Astro i `popstate`; kliknutí na All/Vše parametr z URL odstraní. Identifikátory filtru a kategorie musí zůstat shodné s frontmatterem.
- **Galerie a náhledy článků:** obě detailní routy vykreslují sdílený `ModelGallery.astro`. Snímky sestaví z `heroImage`, seznamu `gallery` a/nebo `galleryFolder` (první dostupný hero snímek je hlavní; duplicity se odstraňují). Galerie potřebuje zachovat poměr 4:3, hlavní obrázek `object-fit: contain`, šipky, klikací miniatury s `aria-pressed` a delegované `click`/`keydown` obsluhy na `data-gallery-*`; události na úrovni dokumentu fungují i po navigaci přes Astro `ClientRouter`. Styly galerie i `SmartMediaFrame.astro` jsou v `src/assets/styles/main.scss`, protože `BaseLayout.astro` načítá tento jediný globální stylesheet přes URL; přesunutí těchto pravidel do nedodaného komponentového CSS by rozbilo layout. `SmartMediaFrame.astro` používají lead obrázek v `BlogNewsFeed.astro` i karty v `BlogCard.astro`: rozostřený `object-fit: cover` podklad sjednocuje výšku snímků, zatímco ostrý popřední obrázek zůstává celý (`contain`). Obě vrstvy galerie i karet čtou `--aw-media-backdrop-tone` a `--aw-media-backdrop-opacity` z motivu; tmavý motiv používá tmavý podklad, světlý zvýšený jas a nižší krytí. Zachovejte tyto kontrakty při změnách layoutu, aby portréty nebyly oříznuté a nezmizel shade efekt.
- **EN ↔ CS články:** obě detailní routy používají `post.id` jako slug a neexistuje párovací metadata ani automatický překlad. Jazykový přepínač zachová stejnou cestu; má-li detail existovat v obou jazycích, musí být odpovídající slug přítomen v obou kolekcích.
- **Zarovnání karet:** `.aw-card` a `.aw-card-content` tvoří svislé flex rozvržení v `main.scss`. Patička článku `.aw-blog-card-footer`, CTA ceníku `.aw-plan-cta`, formát služby `.aw-card-format` a popisek ukázky `.aw-testimonial-meta` používají automatický horní okraj pro zarovnání v řádku; minimální odstupy zůstávají i v mobilním jednom sloupci.
- **TweetONE projektový hub:** `src/pages/tweetone.astro` a `src/pages/cs/tweetone.astro` načítají stejnou kolekci filtrovanou podle `en/` nebo `cs/`, seřadí sekce podle `order` a předají je do `TweetOneContent.astro`. Komponenta ponechává stabilní ID sekcí odvozená ze jmen souborů, ale nevykresluje skákací navigaci. Úvodní galerie a specifikace jsou v horně zarovnaném dvousloupcovém gridu; pravý sloupec obsahuje pouze kartu specifikací s jediným lehkým vnějším rámečkem a kompaktními řádky oddělenými linkou, bez vnořených boxů. Odkazy na blogové články lze vkládat přímo do Markdownu sekcí, nejsou automaticky vypisovány. Každé Markdown body zůstává v `.aw-prose.aw-markdown-body` o šířce 860 px.
- **Citace TweetONE:** sekce `07-reference-configs.md` v EN i CS obsahuje číslovaný seznam externích zdrojů podle ČSN ISO 690:2022 s kotvami `ref-1` až `ref-10`. Relevantní textové odkazy z kapitol `01`–`07` používají tvar `[[číslo]](#ref-číslo)`; `.aw-tweetone-references li:target` jemně zvýrazní cíl odkazu. Při změně bibliografie zachovejte stejné identifikátory a pořadí v obou jazycích.
- **Materiály:** `MaterialsList.astro` čte `src/data/en/materials.csv` nebo `src/data/cs/materials.csv` během buildu. Parser rozpoznává čárku/středník, uvozované hodnoty a vyžaduje sloupce `name`, `manufacturer`, `type`, `description`; zachovejte hlavičku a počet polí.
- **Vyhledávání a metadata:** Pagefind index vzniká při produkčním buildu a hledá pouze obsah v `data-pagefind-body`. Sitemap se generuje z rout a jazyků v `astro.config.mjs`; `robots.txt`, `llms.txt` a další soubory v `public/` se kopírují beze změny. JSON-LD, canonical a hreflang se skládají v `BaseLayout.astro` a `StructuredData.astro`.
- **Klientské skripty a SPA navigace:** `ClientRouter` v `BaseLayout.astro` znovu vytváří DOM při přechodu mezi stránkami. Skripty Navbaru, motivu, formuláře, videa a blogového filtru proto používají delegované události nebo znovu vyhledávají aktuální elementy; neponechávejte reference na staré DOM uzly. Navbar animuje změnu `data-lang` při běžném kliknutí na `.aw-lang-pill`, ale navigaci odkazu neblokuje; motiv synchronizuje všechny `[data-theme-toggle]` při `astro:page-load`.

## 4. Markdown a Rehype pipeline

`astro.config.mjs` nastavuje `markdown.syntaxHighlight: false` a přidává vlastní HAST transformace přes Sätteri processor v pořadí video, obrázky, tabulky. Změna processoru nebo pořadí pluginů může změnit HTML, na které se spoléhají styly `main.scss`.

- `markdown-figures.mjs` převede samostatné obrázky a odkazy obsahující pouze obrázek na `<figure class="aw-markdown-figure">`; textový `title` obrázku se stane popiskem. Smíšený text zůstává v odstavci. Styl obrázku používá theme-aware `--aw-ink-raised` a `--aw-border`.
- `markdown-videos.mjs` rozpozná pouze samostatný validní HTTPS odkaz na YouTube mimo seznam. Vytvoří responsivní náhled a přehrávací odkaz; až po aktivaci se odkaz v `BaseLayout.astro` změní na iframe z `youtube-nocookie.com`. U podporovaných URL přijímá časové značky a při neplatném vstupu transformaci vynechá.
- `markdown-tables.mjs` obalí Markdown i HTML tabulku ve focusovatelný `.article-table-wrapper` s horizontálním scrollováním; již obalenou tabulku neobaluje podruhé. CSS ponechává první a druhý úzký sloupec bez zalamování.
- Všechny tři transformace se použijí i na celé Markdown body sekcí TweetONE — obrázky a samostatné YouTube odkazy mohou být mezi odstavci i na konci souboru. Vnořené obrázky v `src/content/tweetone/en/` a `src/content/tweetone/cs/` odkazují do `src/assets/` relativně přes `../../../assets/...`; cesta z blogového Markdownu je kratší (`../../assets/...`).
- Inline kód styluje `.aw-markdown-body :not(pre) > code` oranžovým theme-aware akcentem. Blok `<pre><code>` zůstává neutrální, monospace, s ohraničením a vodorovným přetečením; pravidla `.aw-markdown-body pre > code` brání zdědění inline vzhledu a kaskádě Bulma.
- Navigace seriálu TweetONE `[1] · [2] ...` je součástí Markdown těla jednotlivých článků, nikoli automaticky generovaná komponenta. Udržujte odkazy, pořadí a Markdown `title` texty (tooltipy) konzistentní ve všech kapitolách.

## 5. Typografie, provoz a Git pravidla

- Sdílený Hero H1 `.aw-display` používá `clamp(1.75rem, 4.2vw, 2.975rem)` a `line-height: 1.15`; jeho Bulma vertikální padding je zkrácen pomocí proměnných `--bulma-hero-body-padding*`. Sekční H2 `.aw-section-title` používá `clamp(1.5rem, 2.5vw, 2rem)` a `line-height: 1.2`. Detail článku má samostatný H1 `clamp(1.65rem, 3vw, 2.3rem)` a čtecí sloupec `.aw-prose` s `max-width: 860px`, textem `1.0625rem` a `line-height: 1.7`.
- Blog index řadí články sestupně podle `pubDate`; karty rubrik, lead story a kompaktní feed jsou v `src/components/blog/`. Lead story i modelové/blogové karty používají `SmartMediaFrame`, ne prostý ořezaný `<Image>`. Při změně identifikátorů kategorií zachovejte soulad mezi daty, URL, filtry a navigací detailu.
- `package.json` požaduje Node `>=22.22.0`; `.nvmrc` uvádí `24.22.1`. CI používá Node 24 a pnpm 10. Projektové příkazy jsou `pnpm check` a `pnpm build`; workflow nasazuje statický obsah z `dist/` na GitHub Pages. V repozitáři je také `package-lock.json`, ale CI a `pnpm-lock.yaml` používají pnpm — lockfile npm není zdrojem pravdy.
- `.github/workflows/main.yml` sestavuje a nasazuje po pushi do `main` nebo ručním spuštění. `.github/workflows/optimize-images.yml` reaguje na změny `src/assets/models/**`, spouští `scripts/optimize-images.mjs`, zapisuje optimalizované obrázky zpět a následně vyvolá produkční build. Workflow neprovádějí `astro check` ani Node testy.
- Videa ukládejte na YouTube; do Git nepatří zejména soubory nad 100 MB. `.gitignore` vylučuje `*.mp4` a `*.mov` bez ohledu na velikost; Git ignore sám velikostní limit nevynucuje, proto nepoužívejte `git add -f` pro video soubory.
- Před úpravou obsahu ověřte odpovídající EN/CS soubory, platnost frontmatteru, URL odkazů a obrázků, výběr kategorie a slugy. Při změně schématu synchronizujte `src/content.config.ts` s `.pages.yml`; po změně komponent nebo rout ověřte `pnpm check` → `pnpm build` a mobilní i světelný/tmavý vzhled.

### Na co si dát pozor, než něco změníš

- Novou blogovou kategorii přidejte současně do `src/utils/blog.ts`, `src/content.config.ts`, obou blogových kolekcí v `.pages.yml`, překladů a všech komponent filtru/navigace.
- Při přidání přeloženého detailu ověřte shodný slug v `blog/` a `blog-cs/`; jazykový přepínač automaticky nepáruje odlišné slugy.
- Zachovejte cesty médií vůči Markdown souborům a povolené přípony; nové modelové obrázky v `src/assets/models/` procházejí samostatným workflow.
- Při změně Astro Markdown processoru ověřte transformace obrázků, YouTube odkazů a tabulek spolu s jejich CSS i testy v `tests/`.
- Barvy nastavujte přes `--aw-*` tokeny, aby změny zůstaly čitelné v obou motivech. Při změně rout ověřte canonical, hreflang, RSS a Pagefind.
- Nezapisujte do Git videa ani pomocí force-add; `*.mp4`/`*.mov` jsou ignorované bez ohledu na velikost.
- Zachovejte pnpm jako správce závislostí a `pnpm-lock.yaml` jako lockfile používaný CI.

## Detailní reference Pages CMS

### Kolekce a pole CMS

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
| `author` | neuveden | `string` | ne | Výchozí hodnota `3DTweet team` |
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
| `TweetONE` | TweetONE | TweetONE |

`src/content.config.ts` validuje `category` právě hodnotami `projects`, `our-models` a `TweetONE` a při vynechání použije `projects`. `author` je volitelné a při vynechání se doplní jako `3DTweet team`. `printablesUrl` je v CMS typu `string`, ale Astro schéma jej validuje jako URL; zadávejte proto úplnou platnou URL. EN a CS články jsou samostatné soubory, jejich překlad se automaticky nevytváří.

### TweetONE Dokumentace (CS) a TweetONE Documentation (EN)

Obě kolekce mají shodnou strukturu a liší se lokalizovanými popisky. V následujících tabulkách je u každého pole uvedeno `name`, přesné `label`, typ a nastavení povinnosti.

| `name` | `label` (CS) | `label` (EN) | Typ | Povinné / výchozí hodnota |
|---|---|---|---|---|
| `eyebrow` | Nadpis štítku | Section eyebrow | `string` | ano |
| `title` | Nadpis sekce | Section heading | `string` | ano |
| `order` | Pořadí sekce | Section order | `number` | ano |
| `altBackground` | Střídavé pozadí sekce | Use alternating section background | `boolean` | ne, výchozí `false` |
| `heroImage` | Úvodní obrázek | Hero image | `image` | ne |
| `galleryFolder` | Složka galerie v src/assets | Gallery folder under src/assets | `string` | ne |
| `gallery` | Galerie | Gallery images | `image`, `list: true` | ne |
| `specs` | Technické parametry | Technical specifications | `object`, `list: true` | ne |
| `body` | Text sekce (Markdown) | Section body (Markdown) | `rich-text` | `required` neuvedeno; Markdown |

Každý prvek `specs` je objekt se dvěma povinnými textovými poli:

| `name` | `label` (CS) | `label` (EN) | Typ | Povinné |
|---|---|---|---|---|
| `label` | Parametr | Specification | `string` | ano |
| `value` | Hodnota | Value | `string` | ano |

`altBackground` má ve schématu Astro výchozí hodnotu `false`. `heroImage`, `galleryFolder`, `gallery` a `specs` jsou volitelné. Úvodní kolekce používá `galleryFolder: models/tweet-one`; `ModelGallery.astro` sdílí stejné 4:3 ovládání, miniatury a theme-aware ambientní pozadí jako blog. CMS pro výběr obrázků a inline upload používá pojmenovaný zdroj `tweetone-images`, jehož relativní výstupní cesta odpovídá hlubšímu umístění souborů EN/CS.

Všechny tělo sekce tvoří plnohodnotný Markdown rich-text editor. Karty, kódové konfigurace, odkazy, tabulky i citace patří do body, ne do polí CMS. Schéma Astro dočasně přijímá také volitelná starší pole `layout`, `highlightBox`, `cards` a `links`, ale aktuální soubory je nepoužívají a Pages CMS je nenabízí.

### Příklady skutečných souborů

#### Blog: `src/content/blog/henrys-shave-medieval-pedestal.md`

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

#### TweetONE: `src/content/tweetone/en/03-hardware-bom.md`

Sekce nyní ukládá pouze metadata do frontmatteru; vlastní seznamy a tabulka jsou standardní Markdown:

````md
---
eyebrow: Hardware & BOM
title: Profile sizes, rails, and motion hardware
order: 3
altBackground: false
---

### Additional hardware

- THK SRS 12GN linear rail (310 mm) for the X axis
- MGN9H / MGN12H rails for the Y axis
- F623RS bearings and 2GT belts
- Brass heat-set inserts for structural joints
- POM anti-backlash nuts for the Z screws

| Component | Qty | Origin | Use in TweetONE | Note |
|---|---:|---|---|---|
| 4040 profile (290 mm) | 4 | Ender 3 + Ender 3 V2 | Lower rectangular frame | Very stiff base geometry |
| 2040 profile (400 mm) | 4 | Ender 3 + Ender 3 V2 | Main vertical frame members | Maintains full print height |
| 2040 profile (350 mm) | 2 | Added / modified Y-axis | Linear rail guides | Validated against Y-axis geometry |
| 2020 profile (300 mm) | 1 | Top bridge | X gantry cross member | Trimmed for exact 300 mm length |
| 2020 profile (350 mm) | 3 | Added / reused | Triple-Z rail support | Used for the Z-axis layout |
````

### Obrázky, Save a nasazení

#### Kam CMS ukládá obrázky

`.pages.yml` definuje dva pojmenované zdroje médií. Oba ukládají do `src/assets/models`, zachovávají názvy souborů a povolují `avif`, `jpg`, `jpeg`, `png`, `webp`; liší se výstupní relativní cestou podle umístění obsahu:

| Zdroj | Kolekce | `output` zapsaný do Markdownu |
|---|---|---|
| `blog-images` | `blog`, `blog-cs` | `../../assets/models` |
| `tweetone-images` | `tweetone-en`, `tweetone-cs` | `../../../assets/models` |

Pole `heroImage`, `gallery` a rich-text body explicitně vybírají odpovídající zdroj. Galerie může místo seznamu cest použít `galleryFolder` pod `src/assets`, například `models/henrys-shave` nebo `models/tweet-one`; komponenta pak načítá obrázky z dané složky. `ModelGallery.astro` vytváří 4:3 scénu a náhledy; pozadí zobrazuje obrázek rozostřeně přes `cover`, popředí bez ořezu přes `contain`. Lead story a `BlogCard.astro` dosahují stejného chování přes `SmartMediaFrame.astro`. Světlý/tmavý vzhled pozadí řídí tokeny `--aw-media-backdrop-tone` a `--aw-media-backdrop-opacity` v `src/assets/styles/main.scss`; nepřepisujte je pevnými barvami ani nevracejte náhledy k `object-fit: cover`.

#### Co dělá optimalizace

`scripts/optimize-images.mjs` se zaměřuje pouze na změněné soubory ve `src/assets/models`. Zpracovává `.jpg`, `.jpeg` a `.png` (ne AVIF ani již existující WebP), podle EXIF obrázek otočí, zmenší jej nejvýše na rozměr 1600 × 1600 px při zachování poměru stran a bez zvětšování menších obrázků, uloží WebP v kvalitě 82, upraví odpovídající cesty ve všech `src/content/**/*.md` a smaže originál. Nepřepisuje již existující WebP a odmítá symbolické odkazy.

Toto převádí zdrojové soubory v repozitáři. Nezaměňovat s build optimalizací: `ModelGallery.astro` navíc při Astro buildu vytváří plné WebP obrázky s maximálním rozměrem 1600 px a náhledy 300 px (kvalita 75). To samo o sobě zdrojové soubory v GitHubu nepřepisuje.

`public/` není vstupem uploadů Pages CMS ani automatizace. Obsahuje jiné statické obrázky a favicony; workflow je mimo povolenou cestu, a proto je nemaže ani nepřejmenovává.

#### Co lze říct o publikování po Save

V repozitáři není uvedena cílová větev, kterou má aplikace Pages CMS při Save použít. Určuje ji nastavení připojeného repozitáře v Pages CMS. Workflow však reagují pouze na větev `main`:

1. Push do `main` spustí `.github/workflows/main.yml`: nastaví Node 24 a pnpm 10, nainstaluje závislosti příkazem `pnpm install --frozen-lockfile`, spustí `pnpm build`, nahraje `dist` a nasadí GitHub Pages. Astro `site` je nastaveno na `https://3dtweets.com`.
2. Push změny v `src/assets/models/**` do `main` navíc spustí `.github/workflows/optimize-images.yml`. Po konverzi workflow zapíše WebP a změněný Markdown zpět do `main` a explicitně vyvolá nový `workflow_dispatch` hlavního produkčního workflow.
3. Protože hlavní workflow reaguje na každý push do `main`, commit s novým obrázkem může spustit build také před dokončením optimalizace; po optimalizačním commitu je vyžádán další build. Ten publikuje výsledný WebP obsah.
4. Workflow nemají nastavenou pevnou dobu nasazení ani časovou garanci. Konkrétní průběh a čekání se ověřuje v GitHub Actions; z kódu nelze slíbit přesný čas dostupnosti na doméně.

Angličtina a čeština se neupravují automatickým překladem. Blog má kolekce `blog` a `blog-cs`; TweetONE má oddělené kolekce `tweetone-en` a `tweetone-cs`, každou se sedmi soubory. Astro používá výchozí jazyk EN bez prefixu a český prefix `/cs/`; stránky TweetONE vybírají složku `en/` nebo `cs/` a řadí sekce podle pole `order`.

### Co upravit v CMS a co přes VS Code

#### Přímo přes Pages CMS

- **Blogové články:** vytvářet a upravovat EN a CS články v odpovídající kolekci. CMS nabízí metadata, kategorie, parametry tisku, obrázky, galerii a Markdown rich-text tělo.
- **TweetONE dokumentaci:** upravovat samostatné sekce EN a CS, jejich pořadí, střídání pozadí, volitelnou galerii/specifikace a celé Markdown tělo. Karty, seznamy, konfigurace, odkazy, tabulky, obrázky a samostatné YouTube odkazy zapisovat přímo do Markdownu.
- Změna titulku existující položky nemá přejmenovat její soubor, protože je `rename` vypnuté. Překlad je třeba uložit do kolekce druhého jazyka.

V `.pages.yml` nejsou položky pro úvodní stránku, O nás, služby, ceny, tým, reference, navigaci, CSV ani styl stránky.

#### Vyžaduje zásah vývojáře ve VS Code

| Obsah nebo chování | Zdroj v projektu |
|---|---|
| Hlavní navigace, přepínače motivu/jazyka a překlady UI (EN/CS) | `src/i18n/ui.ts`, `src/i18n/utils.ts`, `src/components/NavBar.astro`, `ThemeToggle.astro` a `LanguageSwitch.astro` |
| Texty a struktura domovské stránky | `src/pages/index.astro`, `src/pages/cs/index.astro` |
| Obecné údaje webu (název, e-mail, adresa, URL) | `src/data/site.ts` |
| Služby | `src/data/services.ts` |
| Cenové plány | `src/data/pricing.ts` |
| Tým a hodnoty | `src/data/team.ts` |
| Reference / ukázky | `src/data/testimonials.ts` |
| Tabulky materiálů | `src/data/en/materials.csv`, `src/data/cs/materials.csv`; načítá je `src/components/MaterialsList.astro` |
| Designové tokeny, navigace a Bulma Sass | `src/assets/styles/main.scss` |
| URL routy, schémata obsahu a validace Markdown frontmatteru | `src/pages/`, `src/content.config.ts`, `astro.config.mjs` |

Materiálové CSV očekávají sloupce `name,manufacturer,type,description`. Stránky je parsují při buildu, takže je třeba zachovat jejich hlavičku a počet polí. Změny tras, formulářů, rozložení nebo CSS nejsou editací textu v Pages CMS; vyžadují odpovídající změnu komponent a následný build.

#### Projektové prostředí

`package.json` vyžaduje Node `>=22.22.0`; `.nvmrc` obsahuje `24.22.1`. Závislosti jsou spravovány pnpm a `pnpm-lock.yaml`. Astro má výchozí locale `en`, locale `cs` a `prefixDefaultLocale: false`.
