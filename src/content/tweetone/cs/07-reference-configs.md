---
eyebrow: Referenční konfigurace
title: Praktické ukázky a externí zdroje
order: 7
layout: reference
altBackground: false
cards:
  - eyebrow: system.cfg
    column: is-12
    code: |
      # /boot/system.cfg
      WIFI_SSID="MyHomeWiFi"
      WIFI_PASSWD="MySecretPassword"
      hostname="TweetONE-M"
  - eyebrow: printer.cfg pro více MCU
    column: is-12
    code: |
      [mcu]
      serial: /dev/serial/by-id/usb-Klipper_stm32f103xe_12345678-if00

      [mcu GD]
      serial: /dev/serial/by-id/usb-Klipper_gd32f303_87654321-if00

      [printer]
      kinematics: corexy
      max_velocity: 350
      max_accel: 10000
      max_z_velocity: 15
      max_z_accel: 200
  - eyebrow: Sensorless homing pro BTT Manta M8P v2.0
    column: is-12
    code: |
      [stepper_x]
      endstop_pin: tmc2209_stepper_x:virtual_endstop
      homing_retract_dist: 0

      [tmc2209 stepper_x]
      diag_pin: ^PF4
      run_current: 0.800
      driver_SGTHRS: 100
links:
  - label: Irbis3D Duender CoreXY
    url: https://www.youtube.com/@Irbis3D
  - label: CAD v Onshape — Duender CoreXY
    url: https://cad.onshape.com/documents/966ba2a55f3eaeb8f0d4e8fd/w/0c1629acfaec8e996b2f85eb/e/0f8e7f946d3fac114d64b84e
  - label: Printables — Duender MGN12H Edition
    url: https://www.printables.com/model/1282344-duender-mgn12h-edition
  - label: DragonBurner
    url: https://github.com/chirpy2605/voron/blob/main/V0/Dragon_Burner/README.md
  - label: Dokumentace BTT Manta M8P v2.0
    url: https://global.bttwiki.com/M8P-V2_0.html
  - label: Dokumentace BTT EBB36 CANbus
    url: https://os.ratrig.com/docs/toolboards/btt/ebb-36-12/
  - label: Ladění sensorless homingu Voron
    url: https://docs.vorondesign.com/tuning/sensorless.html
---
