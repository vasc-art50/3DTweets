---
eyebrow: Overview
title: The idea behind the build
order: 1
altBackground: false
galleryFolder: models/tweet-one
heroImage: /src/assets/models/tweet-one/Z30_3932.webp
specs:
  - label: Kinematics
    value: CoreXY
  - label: Z axis
    value: Triple-Z
  - label: Motion controller
    value: BTT Manta M8P v2.0 + CB1
  - label: Toolboard
    value: BTT EBB36 CANbus
  - label: Input Shaper
    value: X 69.8 Hz; Y 53.8 Hz
  - label: Safe acceleration
    value: X 14,400 mm/s²; Y 8,500 mm/s²
---

> **Phase 0 — Goal:** Prove that one Raspberry Pi 4B can run dual-MCU Klipper reliably.
>
> **Experiment:** Connect both Creality v4.2.2 boards at once over USB.
>
> **Result:** Stable XY and independent Triple-Z control before the mechanical rebuild began.

TweetONE began as a family engineering project built around a simple challenge: take the most useful parts of two older Creality Ender 3 machines and turn them into a fast, stiff, and precise CoreXY platform designed for real workshop use.

The concept drew inspiration from the Duender CoreXY, Ender NG, Mercury One.1, and RatRig systems [[1]](#ref-1). Related material includes the project's video archive [[2]](#ref-2), Onshape CAD [[3]](#ref-3), and MGN12H edition on Printables [[4]](#ref-4). The build pushed further with linear rails, triple-Z motion, a CANbus toolboard, and a modern Klipper toolchain [[5]](#ref-5). The target was not just a clean printer, but a machine that balances print quality, rigidity, and usable speed.
