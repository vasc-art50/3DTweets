---
eyebrow: Řešení problémů
title: Slepé uličky, které jsme překonali
order: 5
layout: cards
altBackground: false
cards:
  - eyebrow: Problém 1
    title: Invertované piny enable a prohozené signály step/direction
    cause: Mapování GPIO na desce Creality v4.2.2 neodpovídalo očekávané logice pinů v Klipperu.
    fixPrefix: Invertovat pin enable pomocí
    inlineCode: "!"
    fixSuffix: a opravit mapování v konfiguraci tiskárny.
    column: is-6
  - eyebrow: Problém 2
    title: Zpětné napájení 5 V přes USB
    cause: Raspberry Pi napájelo desky Creality přes vodič VBUS.
    fix: Zakrýt 5V pin na obou USB kabelech; propojené zůstanou pouze Data+, Data− a GND.
    column: is-6
  - eyebrow: Problém 3
    title: Kolize vozíku osy Y
    cause: Tištěný držák neposkytoval vozíku MGN dostatečnou vůli.
    fix: Zkrátit 3D model a vytisknout upravenou konstrukci, aby měl vozík bezpečný rozsah pohybu.
    column: is-6
  - eyebrow: Problém 4
    title: Teplotní drift sondy BTT Eddy Duo
    cause: Indukční sonda měnila chování podle teploty podložky a samotné sondy.
    fixPrefix: Provést kompletní kalibraci
    inlineCode: TEMPERATURE_PROBE_CALIBRATE
    fixSuffix: a vytvořit teplotní kompenzační křivku.
    column: is-6
---
