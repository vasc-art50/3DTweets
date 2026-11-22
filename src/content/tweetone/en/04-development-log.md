---
eyebrow: Development log
title: The build timeline from 2025 to 2026
order: 4
altBackground: true
---

### Phase 1 — Onshape design and rail selection

>**December 2025.** We measured the available profiles from both Ender 3 printers and began designing the first CoreXY geometry around THK SRS rails and a tighter gantry footprint.

### Phase 2 — Dual-MCU Klipper bring-up

>**January 2026.** One Raspberry Pi 4B successfully ran two Creality v4.2.2 boards in parallel, proving the multi-MCU concept before machining and assembly began.

### Phase 3 — Origami vs. industrial skeleton

>**February to June 2026.** We explored the Origami concept and an industrial skeleton layout, then developed custom belt tensioners and refined the mechanical system.

### Phase 4 — Z-Tilt and first successful print

>**July to August 2026.** The Z-axis was calibrated with a measured 0.005 mm plane offset, and the printer completed its first successful first layer and print.

### Phase 5 — BTT Manta M8P v2.0 + EBB36 CANbus + DragonBurner

>**August to September 2026.** We upgraded the motion controller to BTT Manta M8P v2.0 with CB1 [[6]](#ref-6) [[7]](#ref-7), then moved to a CANbus toolboard using the BTT EBB36 [[8]](#ref-8) and DragonBurner [[9]](#ref-9). Input shaper measurements, configured with Klipper [[5]](#ref-5), confirmed the final tuning envelope: the Y axis at 53.8 Hz and the X axis at 69.8 Hz, with safe acceleration limits around 8500 mm/s² and 14400 mm/s².