---
eyebrow: Hardware & BOM
title: Profile sizes, rails, and motion hardware
order: 3
layout: hardware
altBackground: false
cards:
  - eyebrow: Additional hardware
    column: is-6
    items:
      - THK SRS 12GN linear rail (310 mm) for the X axis
      - MGN9H / MGN12H rails for the Y axis
      - F623RS bearings and 2GT belts
      - Brass heat-set inserts for structural joints
      - POM anti-backlash nuts for the Z screws
  - eyebrow: Practical note
    column: is-6
    text: The most important design decision was moving away from V-wheels and toward linear motion, better-defined alignment, and stiffer gantry geometry. That allowed the printer to keep a good balance between speed and repeatability.
---

<div class="article-table-wrapper" tabindex="0">
<table class="table is-fullwidth is-striped is-narrow">
  <thead>
    <tr>
      <th>Component</th>
      <th>Qty</th>
      <th>Origin</th>
      <th>Use in TweetONE</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>4040 profile (290 mm)</td><td>4</td><td>Ender 3 + Ender 3 V2</td><td>Lower rectangular frame</td><td>Very stiff base geometry</td></tr>
    <tr><td>2040 profile (400 mm)</td><td>4</td><td>Ender 3 + Ender 3 V2</td><td>Main vertical frame members</td><td>Maintains full print height</td></tr>
    <tr><td>2040 profile (350 mm)</td><td>2</td><td>Added / modified Y-axis</td><td>Linear rail guides</td><td>Validated against Y-axis geometry</td></tr>
    <tr><td>2020 profile (300 mm)</td><td>1</td><td>Top bridge</td><td>X gantry cross member</td><td>Trimmed for exact 300 mm length</td></tr>
    <tr><td>2020 profile (350 mm)</td><td>3</td><td>Added / reused</td><td>Triple-Z rail support</td><td>Used for the Z-axis layout</td></tr>
  </tbody>
</table>
</div>
