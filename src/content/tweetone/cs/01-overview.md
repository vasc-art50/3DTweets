---
eyebrow: Přehled
title: Myšlenka za stavbou
order: 1
altBackground: false
galleryFolder: models/tweet-one
specs:
  - label: Kinematika
    value: CoreXY
  - label: Osa Z
    value: Trojitá osa Z
  - label: Řídicí deska
    value: BTT Manta M8P v2.0 + CB1
  - label: Nástrojová deska
    value: BTT EBB36 CANbus
  - label: Input Shaper
    value: Osa X 69,8 Hz; osa Y 53,8 Hz
  - label: Bezpečné zrychlení
    value: Osa X 14 400 mm/s²; osa Y 8 500 mm/s²
---

> **Fáze 0 — Cíl:** Ověřit, že Raspberry Pi 4B spolehlivě řídí Klipper s více MCU.
>
> **Test:** Současně připojit obě desky Creality v4.2.2 přes USB.
>
> **Výsledek:** Stabilní pohyb XY a nezávislé řízení trojité osy Z ještě před mechanickou přestavbou.

TweetONE začal jako rodinný konstrukční projekt s jednoduchou výzvou: využít nejlepší součásti dvou starších tiskáren Creality Ender 3 a postavit z nich rychlou, tuhou a přesnou tiskárnu CoreXY pro skutečnou práci v dílně.

Inspirací byly projekty Duender CoreXY, Ender NG, Mercury One.1 a RatRig [[1]](#ref-1). Související materiály zahrnují videoarchiv projektu [[2]](#ref-2), CAD v Onshape [[3]](#ref-3) a variantu MGN12H na Printables [[4]](#ref-4). Naše řešení přidalo lineární vedení, trojitou osu Z, nástrojovou desku CANbus a moderní sestavu Klipperu [[5]](#ref-5). Cílem nebyla jen čistá konstrukce, ale vyvážení kvality tisku, tuhosti a praktické rychlosti.