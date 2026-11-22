---
eyebrow: Řešení problémů
title: Slepé uličky, které jsme překonali
order: 5
altBackground: false
---

### Problém 1 — Invertované piny enable a prohozené signály step/direction

>**Příčina:** Mapování GPIO na desce Creality v4.2.2 neodpovídalo očekávané logice pinů v Klipperu.
>
>**Řešení:** Invertovat pin enable pomocí `!` a opravit mapování v konfiguraci tiskárny [[5]](#ref-5).

### Problém 2 — Zpětné napájení 5 V přes USB

>**Příčina:** Raspberry Pi napájelo desky Creality přes vodič VBUS.
>
>**Řešení:** Zakrýt 5V pin na obou USB kabelech; propojené zůstanou pouze Data+, Data− a GND.

### Problém 3 — Kolize vozíku osy Y

>**Příčina:** Tištěný držák neposkytoval vozíku MGN dostatečnou vůli.
>
>**Řešení:** Zkrátit 3D model a vytisknout upravenou konstrukci, aby měl vozík bezpečný rozsah pohybu.

### Problém 4 — Teplotní drift sondy BTT Eddy Duo

>**Příčina:** Indukční sonda měnila chování podle teploty podložky a samotné sondy.
>
>**Řešení:** Provést kompletní kalibraci `TEMPERATURE_PROBE_CALIBRATE` a vytvořit teplotní kompenzační křivku podle dokumentace Klipperu [[5]](#ref-5).
