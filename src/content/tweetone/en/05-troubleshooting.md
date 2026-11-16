---
eyebrow: Troubleshooting
title: The dead ends we solved
order: 5
layout: cards
altBackground: false
cards:
  - eyebrow: Problem 1
    title: Inverted enable pins and swapped step/direction lines
    cause: The Creality v4.2.2 GPIO mappings were not aligned with the expected Klipper pin logic.
    fixPrefix: Invert the enable pin with
    inlineCode: "!"
    fixSuffix: and correct the pin mapping in the printer config.
    column: is-6
  - eyebrow: Problem 2
    title: USB 5V backfeeding
    cause: The Raspberry Pi was feeding 5V back into the Creality boards via VBUS.
    fix: Tape over the 5V pin on both USB cables so the bus carries only Data+ / Data- / GND.
    column: is-6
  - eyebrow: Problem 3
    title: Y-axis carriage collision
    cause: The printed holder geometry left too little clearance for the MGN carriage.
    fix: Shorten the 3D model and reprint the structure to regain safe carriage travel.
    column: is-6
  - eyebrow: Problem 4
    title: BTT Eddy Duo temperature drift
    cause: The inductive probe changed behavior with bed and probe temperature shifts.
    fixPrefix: Complete a full
    inlineCode: TEMPERATURE_PROBE_CALIBRATE
    fixSuffix: routine and build a temperature compensation curve.
    column: is-6
---
