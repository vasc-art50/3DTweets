---
title: "6. Tiskárna jako maturitní práce – měření anti-backlash matic a napětí řemenů"
description: "Jak jsme stavbu TweetONE propojili se synovou maturitní prací: srovnávací analýza mosazných a anti-backlash POM matic na ose Z a stavba vlastního tenzometrického měřiče napětí řemenů GT2."
pubDate: 2026-10-15
category: TweetONE
tags: ["TweetONE", "Maturitní projekt", "Měření", "Anti-backlash", "GT2", "Mechatronika"]
---

Stavba 3D tiskárny **TweetONE** od začátku nebyla jen víkendovým kutilským projektem. Pro syna se stala praktickým základem pro jeho **maturitní práci**, ve které spojuje mechaniku, elektroniku a měření přesnosti pohybových soustav.

Zaměřili jsme se na dvě klíčové oblasti, které u CoreXY tiskáren postavených ze starších komponent rozhodují o kvalitě tisku.

[FOTO: Konstrukce tenzometrického měřiče napětí řemenů GT2 z digitální lžicové váhy]

## 1. Vliv anti-backlash POM matic na přesnost osy Z

U cenově dostupných tiskáren (jako Ender 3) bývají trapézové tyče často mírně prohnuté a standardní mosazné matice mají mezi závity drobnou vůli (*backlash*). Při změně směru pohybu nebo mikroskopických korekcích během `Z_TILT_ADJUST` a `BED_MESH` pak vzniká nepřesnost a viditelné vlnkování stěn (*Z-wobble*).

V maturitní práci porovnáváme klasické mosazné matice s dvoudílnými odpruženými **anti-backlash maticemi z POM (Delrinu)**:
* **Vymezení mrtvého chodu:** Pružina neustále tlačí obě poloviny matice proti bokům závitu trapézové tyče, čímž eliminuje axiální vůli.
* **Tlumení vibrací a tišší chod:** POM je technický plast s nízkým součinitelem tření a vysokou odolností proti opotřebení. V kombinaci s pružnými spojkami motorů umožňuje mírně křivé tyči „plavat“, aniž by se její házivost přenášela do lineárního vedení podložky.
* **Metodika měření:** Pomocí opakovaného najíždění osy Z a vyhodnocení opakovatelnosti měření sondou (a úchylkoměrem) kvantifikujeme rozdíl v přesnosti polohování obou typů matic.

## 2. DIY tenzometrický měřič napětí řemenů GT2

U kinematiky CoreXY platí jedno neúprosné pravidlo: **oba řemeny (A i B) musí mít identické napětí**. Pokud je jeden řemen napnutý více než druhý, příčný nosník osy X se mírně zkříží, tiskárna netiskne pravé úhly a zhoršuje se i rezonanční charakteristika při vyšších akceleracích.

Místo odhadu „podle zvuku drnknutí“ nebo drahých komerčních tenzometrů jsme se pustili do stavby vlastního měřiče napětí řemenů **GT2 (6 mm)** s tenzometrickým snímačem:

### Kusovník tenzometrického měřiče
* **Snímač a elektronika:** Tenzometr a displej vykuchaný z digitální kuchyňské lžicové váhy (rozsah 500 g, rozlišení 0,1 g).
* **Tělo měřiče:** 3D tištěné díly (tělo, páka, držák).
* **Mechanické prvky:**
  * 1× kuličkové ložisko `3 × 8 × 4 mm`
  * 1× čep `13,5 × 3 mm` a 1× hřídel `2 × 43 mm`
  * 1× tlačná pružina (průměr drátu `0,5 mm`, vnější průměr `5 mm`, délka `27 mm`)
  * 2× kovová vložka `5,1 × 6,8 × 10,5 mm`
  * Šrouby: 2× `M3 × 5,5 mm` a 2× `M3 × 10 mm` se zapuštěnou hlavou

[FOTO: Hotový 3D tištěný měřič napětí řemenů GT2 při měření na tiskárně]

Díky vlastnímu měřiči dokážeme napětí obou větví CoreXY řemenů nastavit na stejnou číselnou hodnotu a objektivně sledovat i to, jak se změna předpětí řemenů projeví na křivkách **Input Shaperu**.