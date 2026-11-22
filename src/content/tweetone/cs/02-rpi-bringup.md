---
eyebrow: První spuštění Raspberry Pi
title: Klipper s více MCU z jednoho Raspberry Pi
order: 2
altBackground: true
---

### `system.cfg`

```text
WIFI_SSID="YourHomeWiFi"
WIFI_PASSWD="VerySecretPassword"
hostname="TweetONE-M"
```

### `make menuconfig`

```text
# STM32F103 board
Micro-controller Architecture: STMicroelectronics STM32
Processor model: STM32F103
Bootloader offset: 28KiB bootloader
Communication interface: Serial (USART1 PA10/PA9)

# GD32F303 board
Disable SWD at startup: enabled
```

### Odstranění 5 V z USB

```text
USB-A connector layout:
[ 1: 5V (tape / remove) ] [ 2: Data- ] [ 3: Data+ ] [ 4: GND ]

# Připojené zůstávají jen datové vodiče a zem.
# Tím se odstraní zpětné napájení 5 V a stabilizuje sériová sběrnice.
```

### Vyhledání zařízení

```sh
ls /dev/serial/by-id/*

/dev/serial/by-id/usb-Klipper_stm32f103xe_36FFD5054252303728641943-if00
/dev/serial/by-id/usb-Klipper_gd32f303_51FFD8054252383832541143-if00
```

### `printer.cfg`

```ini
[mcu]
serial: /dev/serial/by-id/usb-Klipper_stm32f103xe_36FFD5054252303728641943-if00

[mcu GD]
serial: /dev/serial/by-id/usb-Klipper_gd32f303_51FFD8054252383832541143-if00
```

**Krok 1:** Nahrajte MainsailOS nebo obraz BTT CB1 a nastavte Wi-Fi a název hostitele.

**Krok 2:** Připojte se k Raspberry Pi přes SSH a zjistěte sériová ID desek.

**Krok 3:** Pomocí `make menuconfig` připravte Klipper pro desku STM32F103 i GD32F303.

**Krok 4:** Odpojte 5V vodič v USB kabelu, aby nedocházelo ke zpětnému napájení desek ani k nestabilitě sériové linky.

**Krok 5:** Zapište správné adresy MCU do `printer.cfg` [[5]](#ref-5) a ověřte pohyb před konečnou montáží.
