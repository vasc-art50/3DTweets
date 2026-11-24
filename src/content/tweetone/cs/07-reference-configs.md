---
eyebrow: Referenční konfigurace
title: Praktické ukázky a externí zdroje
order: 7
altBackground: false
---

### Ukázka `system.cfg`

```ini
# /boot/system.cfg
WIFI_SSID="MyHomeWiFi"
WIFI_PASSWD="MySecretPassword"
hostname="TweetONE-M"
```

### `printer.cfg` pro více MCU

```ini
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
```

### Sensorless homing pro BTT Manta M8P v2.0

Při úpravě těchto hodnot vycházejte z konfigurační reference Klipperu [[5]](#ref-5) a z návodu Voron Design k ladění sensorless homingu [[10]](#ref-10).

```ini
[stepper_x]
endstop_pin: tmc2209_stepper_x:virtual_endstop
homing_retract_dist: 0

[tmc2209 stepper_x]
diag_pin: ^PF4
run_current: 0.800
driver_SGTHRS: 100
```

### Zdroje

<ol class="aw-tweetone-references">
  <li id="ref-1">Irbis3D. <em>Duender</em> [online]. GitHub. [cit. 2026-11-22]. Dostupné z: <a href="https://github.com/Irbis3D/Duender">https://github.com/Irbis3D/Duender</a>.</li>
  <li id="ref-2">Irbis3D. <em>Duender CoreXY</em> [online]. YouTube. [cit. 2026-11-22]. Dostupné z: <a href="https://www.youtube.com/@Irbis3D">https://www.youtube.com/@Irbis3D</a>.</li>
  <li id="ref-3">Irbis3D. <em>Duender CoreXY CAD</em> [online]. Onshape. [cit. 2026-11-22]. Dostupné z: <a href="https://cad.onshape.com/documents/966ba2a55f3eaeb8f0d4e8fd/w/0c1629acfaec8e996b2f85eb/e/0f8e7f946d3fac114d64b84e">https://cad.onshape.com/documents/966ba2a55f3eaeb8f0d4e8fd/w/0c1629acfaec8e996b2f85eb/e/0f8e7f946d3fac114d64b84e</a>.</li>
  <li id="ref-4">Irbis3D. <em>Duender MGN12H Edition</em> [online]. Printables. [cit. 2026-11-22]. Dostupné z: <a href="https://www.printables.com/model/1282344-duender-mgn12h-edition">https://www.printables.com/model/1282344-duender-mgn12h-edition</a>.</li>
  <li id="ref-5">Klipper. <em>Configuration Reference</em> [online]. Klipper Documentation. Verze 0.12.0. [cit. 2026-11-22]. Dostupné z: <a href="https://github.com/Klipper3d/klipper/blob/v0.12.0/docs/Config_Reference.md">https://github.com/Klipper3d/klipper/blob/v0.12.0/docs/Config_Reference.md</a>.</li>
  <li id="ref-6">BIGTREETECH. <em>BIGTREETECH MANTA M8P V2.0 User Manual</em> [online]. BIGTREETECH. Revize 2.0. [cit. 2026-11-22]. Dostupné z: <a href="https://github.com/bigtreetech/Manta-M8P/blob/master/V2.0/BIGTREETECH%20MANTA%20M8P%20V2.0%20User%20Manual.pdf">https://github.com/bigtreetech/Manta-M8P/blob/master/V2.0/BIGTREETECH%20MANTA%20M8P%20V2.0%20User%20Manual.pdf</a>.</li>
  <li id="ref-7">BIGTREETECH. <em>M8P V2.0</em> [online]. BIGTREETECH Wiki. [cit. 2026-11-22]. Dostupné z: <a href="https://global.bttwiki.com/M8P-V2_0.html">https://global.bttwiki.com/M8P-V2_0.html</a>.</li>
  <li id="ref-8">RatRig. <em>BTT EBB36/12</em> [online]. Dokumentace RatOS. [cit. 2026-11-22]. Dostupné z: <a href="https://os.ratrig.com/docs/toolboards/btt/ebb-36-12/">https://os.ratrig.com/docs/toolboards/btt/ebb-36-12/</a>.</li>
  <li id="ref-9">Chirpy. <em>Dragon Burner</em> [online]. GitHub. [cit. 2026-11-22]. Dostupné z: <a href="https://github.com/chirpy2605/voron/blob/main/V0/Dragon_Burner/README.md">https://github.com/chirpy2605/voron/blob/main/V0/Dragon_Burner/README.md</a>.</li>
  <li id="ref-10">Voron Design. <em>Sensorless homing tuning</em> [online]. Dokumentace Voron Design. [cit. 2026-11-22]. Dostupné z: <a href="https://docs.vorondesign.com/tuning/sensorless.html">https://docs.vorondesign.com/tuning/sensorless.html</a>.</li>
</ol>
