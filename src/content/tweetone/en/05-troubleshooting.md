---
eyebrow: Troubleshooting
title: The dead ends we solved
order: 5
altBackground: false
---

### Problem 1 — Inverted enable pins and swapped step/direction lines

**Cause:** The Creality v4.2.2 GPIO mappings were not aligned with the expected Klipper pin logic.

**Fix:** Invert the enable pin with `!` and correct the pin mapping in the printer config [[5]](#ref-5).

### Problem 2 — USB 5V backfeeding

**Cause:** The Raspberry Pi was feeding 5V back into the Creality boards via VBUS.

**Fix:** Tape over the 5V pin on both USB cables so the bus carries only Data+ / Data- / GND.

### Problem 3 — Y-axis carriage collision

**Cause:** The printed holder geometry left too little clearance for the MGN carriage.

**Fix:** Shorten the 3D model and reprint the structure to regain safe carriage travel.

### Problem 4 — BTT Eddy Duo temperature drift

**Cause:** The inductive probe changed behavior with bed and probe temperature shifts.

**Fix:** Complete a full `TEMPERATURE_PROBE_CALIBRATE` routine and build a temperature compensation curve using the Klipper configuration guidance [[5]](#ref-5).
