---
title: "TweetONE CoreXY: from two Ender 3s to a high-speed CoreXY build"
description: "A practical build diary on transforming two Ender 3 printers into a rigid CoreXY machine with Triple-Z, linear rails, and CANbus control."
pubDate: 2026-10-20
tags: ["tweetone", "corexy", "klipper", "3d-printing"]
---

The TweetONE project started with a very practical question: what if we took two older Ender 3 machines, reused the best parts, and turned them into a genuinely capable CoreXY printer?

That idea grew into a real engineering build. The project pulled inspiration from Duender CoreXY, Ender NG, Mercury One.1, and RatRig, but the direction was very specific: keep the machine sturdy, make it fast, and make the hardware choices match the way we actually work in a small workshop.

## A better starting point

We did not want a printer that looked impressive on paper but was clumsy in use. We wanted a machine that would be stable under load, easier to tune, and more consistent once it started producing serious parts.

The biggest shift was moving to linear rails, a Triple-Z setup, and a modern Klipper stack. The mechanical changes were not cosmetic. They changed how the machine behaved at speed, how much the gantry flexed, and how confident we could be in first-layer quality.

## Multi-MCU Klipper came first

Before we rebuilt the machine mechanically, we had to prove that one Raspberry Pi could run multiple controller boards reliably. The first testing phase used two Creality v4.2.2 boards at once through USB and confirmed that dual-MCU Klipper could manage XY motion and a separate Z stack without dropping communication.

This was a crucial step. It meant the real machine build was not based on hope — it was built on a stable control architecture.

## The constraints that shaped the design

One of the biggest design rules was to reuse as much as possible from two existing Ender 3 / Ender 3 V2 printers while improving the motion system. The final build used 4040 and 2040 profiles, custom-braced geometry, and carefully selected linear guides to keep the frame rigid without overcomplicating the assembly.

We also had to deal with a few practical issues that are common in these projects: USB backfeeding, mismatched board types, endstop logic, and irregular carriage motion. Every one of those became a learning point rather than a dead end.

## What changed in the build process

The build timeline was split into clear phases:

- Phase 1: profile analysis, Onshape design, and rail selection
- Phase 2: dual-MCU validation and motion bring-up
- Phase 3: belt tensioning, frame adjustments, and concept exploration
- Phase 4: Z-Tilt tuning and first successful print
- Phase 5: Manta M8P v2.0, CANbus EBB36, and DragonBurner upgrade

The point was not just to make a faster machine, but to create a machine with a better understanding of its own geometry. Once we reached the point where the Z-Tilt alignment measured at 0.005 mm, it became clear the motion system had moved from experimental into highly useful territory.

## Why the project matters

The value of TweetONE is not only that it works. It is that it turns engineering concepts into a practical, measurable system:

- mechanical alignment matters,
- belt tension is not optional,
- margin for error should be built into the machine,
- and a careful combination of hardware, firmware, and tuning can produce a machine that feels precise rather than merely fast.

The project is also a great example of what happens when a hobby build becomes a real technical platform: a custom machine can become a test bench for resonance tuning, motion calibration, toolboard integration, and future upgrades.

## Read the full project page

This post is a short overview of the build. For the complete story — including the multi-MCU setup, hardware checklist, tuning notes, troubleshooting, and reference links — read the full TweetONE CoreXY project page.

[Explore the TweetONE CoreXY documentation](/tweetone)
