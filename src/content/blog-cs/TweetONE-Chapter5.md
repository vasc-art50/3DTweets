---
title: "5. Kalibrace Input Shaperu (14 400 mm/s²) a teplotní drift BTT Eddy Duo"
description: "Měření rezonancí konstrukce TweetONE pomocí akcelerometru a kompletní postup teplotní kalibrace vířivé sondy BTT Eddy Duo od 30 °C do 100 °C."
pubDate: 2026-09-28
category: TweetONE
tags: ["TweetONE", "Input Shaper", "BTT Eddy Duo", "Kalibrace", "Klipper", "Z-offset"]
---

Po zprovoznění desky Manta M8P v2.0 a tiskové hlavy DragonBurner přišla na řadu klíčová fáze: odladit vysokorychlostní kinematiku CoreXY pomocí **Input Shaperu** a vyřešit teplotní kalibraci vířivé sondy **BTT Eddy Duo**, aby první vrstva držela stejně přesně při tisku PLA i při vyhřátí podložky na 100 °C pro ABS/ASA.

[FOTO: Průběh kalibrace a výsledky Z-Tilt / Bed Mesh v rozhraní Mainsail]

## Měření rezonancí: Input Shaper (`SHAPER_CALIBRATE`)

Díky akcelerometru integrovanému přímo na CANbus desce BTT EBB36 jsme změřili vlastní rezonanční frekvence rámu TweetONE pro obě osy:

| Osa | Doporučený filtr | Rezonanční frekvence | Zbytkové vibrace | Doporučené max. zrychlení |
| :--- | :---: | :---: | :---: | :---: |
| **Osa X** | `mzv` | **69,8 Hz** | 0,8 % | **≤ 14 400 mm/s²** |
| **Osa Y** | `mzv` | **53,8 Hz** | 0,7 % | **≤ 8 500 mm/s²** |

Hodnota **14 400 mm/s²** na ose X (s pouhými 0,8 % zbytkových vibrací) potvrdila, že kombinace hliníkového rámu s kovovými úhelníky a japonské lineární kolejnice THK SRS 12GN dává tiskárně mimořádnou tuhost.

## Jak vyřešit teplotní drift u BTT Eddy Duo

Vířivé (eddy current) sondy dokážou naskenovat celou podložku během několika sekund, ale jejich měření je citlivé na teplotu okolí – jak se ohřívá vyhřívaná podložka, mění se i naměřená hodnota Z-offsetu.

Abychom se vyhnuli chybám typu `Must home axis first` nebo `Invalid probe_eddy_current height` (které jsme vyřešili správným nastavením `descend_z: 2.5` a souřadnic `X=0, Y=32, Z=3.5`), provedli jsme kompletní **teplotní kalibraci sondy**:

1. **Základní kalibrace proudu sondy:** Pomocí `PROBE_EDDY_CURRENT_CALIBRATE CHIP=btt_eddy` (případně s dočasným `SET_KINEMATIC_POSITION Z=50` při prvním oživení) a klasického papírového testu.
2. **Spuštění teplotní křivky:** Prodloužili jsme timeout nečinnosti a spustili automatický kalibrační cyklus po krocích 4 °C:
   ```gcode
   SET_IDLE_TIMEOUT TIMEOUT=36000
   TEMPERATURE_PROBE_CALIBRATE PROBE=btt_eddy TARGET=56 STEP=4
    ```
Zahřátí tiskárny: Nastavili jsme teplotu podložky na 100 °C a extruderu na 240 °C, aby teplota samotného senzoru BTT Eddy Duo postupně stoupala.

Opakované měření: Klipper při každém nárůstu teploty sondy o 4 °C automaticky zaparkoval hlavu a vyzval nás k ověření výšky trysky papírovým testem.

Uložení křivky: Po dosažení cílové teploty jsme kalibraci ukončili příkazem TEMPERATURE_PROBE_COMPLETE a uložili do printer.cfg přes SAVE_CONFIG.

Od té chvíle sonde nevadí ani rozdílné tiskové teploty – BED_MESH_CALIBRATE ADAPTIVE=1 před každým tiskem zmapuje pouze oblast budoucího výtisku s naprostou přesností.