---
eyebrow: Development log
title: The build timeline from 2025 to 2026
order: 4
layout: cards
altBackground: true
cards:
  - eyebrow: Phase 1
    title: Onshape design and rail selection
    date: December 2025.
    text: We measured the available profiles from both Ender 3 printers and began designing the first CoreXY geometry around THK SRS rails and a tighter gantry footprint.
    column: is-6
  - eyebrow: Phase 2
    title: Dual-MCU Klipper bring-up
    date: January 2026.
    text: One Raspberry Pi 4B successfully ran two Creality v4.2.2 boards in parallel, proving the multi-MCU concept before machining and assembly began.
    column: is-6
  - eyebrow: Phase 3
    title: Origami vs. industrial skeleton
    date: February to June 2026.
    text: We explored the Origami concept and an industrial skeleton layout, then developed custom belt tensioners and refined the mechanical system.
    column: is-6
  - eyebrow: Phase 4
    title: Z-Tilt and first successful print
    date: July to August 2026.
    text: The Z-axis was calibrated with a measured 0.005 mm plane offset, and the printer completed its first successful first layer and print.
    column: is-6
  - eyebrow: Phase 5
    title: BTT Manta M8P v2.0 + EBB36 CANbus + DragonBurner
    date: August to September 2026.
    text: >-
      We upgraded the motion controller to BTT Manta M8P v2.0 with CB1, then
      moved to a CANbus toolboard using the BTT EBB36 and DragonBurner. Input
      shaper measurements then confirmed the final tuning envelope: the Y axis
      at 53.8 Hz and the X axis at 69.8 Hz, with safe acceleration limits around
      8500 mm/s² and 14400 mm/s².
    column: is-12
---
