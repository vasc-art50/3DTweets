---
eyebrow: Hardware & BOM
title: Profile sizes, rails, and motion hardware
order: 3
altBackground: false
---

### Additional hardware

- THK SRS 12GN linear rail (310 mm) for the X axis
- MGN9H / MGN12H rails for the Y axis [[4]](#ref-4)
- F623RS bearings and 2GT belts
- Brass heat-set inserts for structural joints
- POM anti-backlash nuts for the Z screws

### Practical note

The most important design decision was moving away from V-wheels and toward linear motion, better-defined alignment, and stiffer gantry geometry. That allowed the printer to keep a good balance between speed and repeatability.

| Component | Qty | Origin | Use in TweetONE | Note |
|---|---:|---|---|---|
| 4040 profile (290 mm) | 4 | Ender 3 + Ender 3 V2 | Lower rectangular frame | Very stiff base geometry |
| 2040 profile (400 mm) | 4 | Ender 3 + Ender 3 V2 | Main vertical frame members | Maintains full print height |
| 2040 profile (350 mm) | 2 | Added / modified Y-axis | Linear rail guides | Validated against Y-axis geometry |
| 2020 profile (300 mm) | 1 | Top bridge | X gantry cross member | Trimmed for exact 300 mm length |
| 2020 profile (350 mm) | 3 | Added / reused | Triple-Z rail support | Used for the Z-axis layout |
