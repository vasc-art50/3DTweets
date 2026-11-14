---
title: "TweetONE CoreXY: od dvou Enderů 3 k rychlé tiskárně CoreXY"
description: "Zápis ze stavby tuhé tiskárny CoreXY ze dvou tiskáren Ender 3: trojitá osa Z, lineární vedení a řízení přes CANbus."
pubDate: 2026-10-20
tags: ["tweetone", "corexy", "klipper", "3d tisk"]
---

Projekt TweetONE začal praktickou otázkou: co kdybychom využili nejlepší díly
ze dvou starších tiskáren Ender 3 a postavili z nich skutečně schopnou tiskárnu
CoreXY?

Z nápadu vznikl reálný konstrukční projekt. Inspiraci jsme čerpali z Duender
CoreXY, Ender NG, Mercury One.1 a RatRig, směr však byl jasný: zachovat tuhou
konstrukci, zvýšit rychlost a volit hardware podle skutečné práce v malé dílně.

## Lepší výchozí základ

Nechtěli jsme tiskárnu, která dobře vypadá na papíře, ale špatně se používá.
Cílem byl stabilní stroj, který se snadno ladí a spolehlivě vyrábí i náročnější
díly.

Zásadní změnou bylo použití lineárního vedení, trojité osy Z a moderní sestavy
Klipperu. Nešlo o kosmetické úpravy: změnily chování stroje při vyšší rychlosti,
pružnost portálu i jistotu při tisku první vrstvy.

## Nejprve víceřadičový Klipper

Než jsme zasáhli do mechaniky, ověřili jsme, že jeden Raspberry Pi spolehlivě
zvládne více řídicích desek. První test využil přes USB dvě desky Creality
v4.2.2. Potvrdil, že Klipper s více MCU dokáže řídit pohyb XY i samostatnou
sestavu osy Z bez výpadků komunikace.

To byl důležitý krok: stavba tiskárny už nestála na předpokladech, ale na
ověřené řídicí architektuře.

## Omezení, která určovala návrh

Jedním z hlavních pravidel bylo znovu využít co nejvíce dílů ze dvou tiskáren
Ender 3 / Ender 3 V2 a současně zlepšit pohybovou soustavu. Výsledná konstrukce
kombinuje profily 4040 a 2040, vlastní výztuhy a pečlivě vybraná lineární vedení.

Řešili jsme také běžné problémy podobných projektů: napájení desek přes USB,
rozdílné typy řadičů, logiku koncových spínačů i nerovnoměrný pohyb vozíku.
Každý problém se stal zdrojem zkušeností, ne slepou uličkou.

## Jak se stavba vyvíjela

- Fáze 1: zaměření profilů, návrh v Onshape a výběr vedení.
- Fáze 2: ověření více MCU s Klipperem a první zkoušky pohybu.
- Fáze 3: napínání řemenů, úpravy rámu a hledání koncepce.
- Fáze 4: ladění Z-Tiltu a první úspěšný výtisk.
- Fáze 5: upgrade na Manta M8P v2.0, CANbus EBB36 a DragonBurner.

Cílem nebyla pouze vyšší rychlost, ale i lepší kontrola geometrie stroje.
Po dosažení odchylky vyrovnání Z-Tiltu 0,005 mm bylo zřejmé, že se systém
posunul od experimentu k prakticky použitelnému stroji.

## Proč projekt stojí za pozornost

Hodnota TweetONE nespočívá jen v tom, že tiskárna funguje. Převádí konstrukční
principy na praktický a měřitelný systém:

- záleží na mechanickém seřízení,
- správné napnutí řemenů je nezbytné,
- konstrukce musí počítat s tolerancemi a rezervou,
- promyšlené spojení hardwaru, firmwaru a ladění vede k přesnosti, nejen
  k rychlosti.

Projekt také ukazuje, jak se hobby stavba může stát technickou platformou pro
ladění rezonancí, pohybu, nástrojové desky i budoucích rozšíření.

## Celá dokumentace projektu

Tento článek shrnuje stavbu. Úplný popis víceřadičového zapojení, hardwaru,
ladění, řešení problémů a odkazů najdete na stránce projektu TweetONE CoreXY.

[Zobrazit dokumentaci TweetONE CoreXY](/cs/tweetone/)
