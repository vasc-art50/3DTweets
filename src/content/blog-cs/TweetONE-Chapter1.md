---
title: "1. Jak ze dvou bazarových Enderů postavit CoreXY tiskárnu"
description: "Start projektu TweetONE v prosinci 2025. Porovnání profilů Ender 3 a Ender 3 V2, kusovník přestavby Duender, volba lineárních kolejnic THK a MGN a příprava na Triple-Z."
pubDate: 2025-12-31
category: TweetONE
tags: ["TweetONE", "CoreXY", "Duender", "Ender 3", "Ender 3 V2", "Lineární vedení"]
---

V prosinci 2025 jsme odstartovali náš největší společný hardwarový projekt – stavbu vysokorychlostní CoreXY 3D tiskárny **TweetONE** ze dvou bazarových tiskáren **Creality Ender 3** a **Ender 3 V2**. Syn už měl za sebou spoustu úprav původní Ender 3 Pro, takže posunout se ke kinematice CoreXY byl dalším logickým krokem.

Jako výchozí konstrukční inspiraci jsme zvolili otevřený komunitní projekt **Duender CoreXY** (a příbuzný **Ender 3 NG**), který je navržený tak, aby znovu využil maximum hliníkových profilů, motorů a spojovacího materiálu z obou dárcovských tiskáren.

[FOTO: Původní bazarové tiskárny Ender 3 a Ender 3 V2 / první návrh konstrukce v CADu]

## Klíčový rozdíl mezi Ender 3 a Ender 3 V2: Profily osy Y

Původní návrh Duender vychází z nejstarších verzí Ender 3, které pod vyhřívanou podložkou (osa Y) používaly profily `2040`. Novější **Ender 3 V2** však na ose Y používá širší profil `4040`. Pokud nechcete přepracovávat vozíky (což by je zvětšilo a přidalo hmotnost), je nutné mít pro osu Y dva profily `2040`.

Po rozebrání obou tiskáren a doplnění nových profilů (objednávka z 31. 12. 2025) jsme sestavili finální bilanci rámu:

| Rozměr profilu | Počet | Původ | Využití v konstrukci TweetONE |
| :--- | :---: | :--- | :--- |
| **4040 – 290 mm** | 4× | Základní nohy E3 + E3 V2 | Spodní obdélníková základna rámu |
| **4040 – 330 mm** | 1× | Osa Y (Ender 3 V2) | Rezerva (nevyužito) |
| **2040 – 400 mm** | 4× | Svislé stojky E3 + E3 V2 | Hlavní svislé sloupky konstrukce |
| **2040 – 330 mm** | 1× | Osa Y (Ender 3) | Rezerva (nahrazeno delšími profily) |
| **2040 – 350 mm** | 2× | Dokoupeno (V-Slot Black) | Uchycení lineárního vedení osy Y |
| **2020 – 330 mm** | 2× | Horní příčky E3 + E3 V2 | 1× zadní podpěra motorů X/Z, 1× rezerva |
| **2020 – 345 mm** | 2× | Původní osa X (E3 + E3 V2) | Rezerva |
| **2020 – 300 mm** | 1× | Zkráceno z 330 mm | Příčný nosník osy X (gantry) |
| **2020 – 350 mm** | 4× | Dokoupeno (V-Slot Black) | 3× sloupky pro Triple-Z lineární vedení, 1× rezerva |

### Co dalšího jsme z Enderů využili a co se muselo dokoupit?

* **Krokové motory:** Využili jsme všechny původní motory – nejsilnější motory z extruderů obou tiskáren šly na pohon os X a Y, zbývající motory na osu Z. *(Pozor: u novější Ender 3 V2 jsou mosazné řemenice na hřídelích nalisované za tepla – pro jejich stažení se hodí speciální vytahovák).*
* **Trapézové tyče:** Původní šrouby z osy Z (při klasické montáži je nutné je zkrátit o 10–15 mm, aby do nich nenarážel extruder).
* **Vyhřívaná podložka a zdroj:** Původní 24V zdroj a vyhřívaný bed zůstávají zachovány.
* **Dokoupený hardware (cca 1 000–1 200 Kč bez kolejnic):** 20× přírubové ložisko **F623RS**, 2× řemen **2GT (šířka 6 mm, délka cca 1,5 m)**, sada cca **40 kovových rohových úhelníků** se šrouby M5×8 mm a T-maticemi (kovové úhelníky jsou zásadní pro pravoúhlost rámu) a závitové vložky M3.

## Odklon od V-koleček: Lineární kolejnice a Triple-Z

Základní verze Duender používá původní V-kolečka, ale pro vyšší rychlosti a přesnost jsme se rovnou rozhodli přejít na lineární vedení (inspirace verzí **Duender MGN9H / MGN12H** a **Ender 3 NG / VIRTU E3**):

1. **Osa X – japonské THK SRS 12GN (310 mm):** Největší výzvou bylo napasovat na portál osy X lineární vedení od Průši. THK představuje špičkovou přesnost bez vůlí, což je na nejrychleji se pohybující ose tiskové hlavy znát. Pro správnou rozteč vozíků (304,7 mm) jsme zkrátili profil osy X přesně na **300 mm**.
2. **Osy Y a Z – kolejnice MGN a 3 nezávislé Z-osy:** Na osu Y jsme zvolili kolejnice uložené na profilech `2040 × 350 mm`. Pro osu Z nás zaujala koncepce nezávislého tříbodového zavěšení podložky (**Triple-Z**) s levnějšími kolejnicemi od *Magic Dragon* doplněnými o [zarovnávací klipy na profily 2020](https://www.printables.com/model/703504-2020-linear-rail-alignment-clips).
3. **Anti-backlash POM matice:** Na trapézové tyče jsme nasadili odpružené POM matice (Delrin), které vymezují mrtvý chod závitu a tlumí přenos nerovností tyče (*Z-wobble*). Srovnávací měření jejich přesnosti vůči klasickým mosazným maticím navíc poslouží jako podklad pro synovu maturitní práci.

[FOTO: 3D sestava v Onshape – rozložení profilů, držáků motorů a Triple-Z]

## Doporučení pro tisk dílů před demontáží

Všechny plastové díly rámu a držáky bylo nutné vytisknout ještě před rozebráním poslední funkční tiskárny. Pro pohybové části a díly v blízkosti motorů jsme zvolili **ABS / ASA** (kvůli tepelné odolnosti a tuhosti), pro vnější stacionární díly **PETG** – při nastavení 4–5 perimetrů, 5–7 horních/spodních vrstev a výplni minimálně **50 %** (u namáhaných držáků až 100 %).