---
eyebrow: RPi bring-up
title: Multi-MCU Klipper from a single Raspberry Pi
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

### USB 5V tape-cut fix

```text
USB-A connector layout:
[ 1: 5V (tape / remove) ] [ 2: Data- ] [ 3: Data+ ] [ 4: GND ]

# Only the data pairs and GND remain connected.
# This removes 5V backfeeding and stabilizes the serial bus.
```

### Device discovery

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

**Step 1:** Flash MainsailOS or a BTT CB1 image and configure Wi-Fi and the hostname.

**Step 2:** Bring the Pi up over SSH and locate the board serial IDs.

**Step 3:** Compile Klipper with `make menuconfig` for an STM32F103 and a GD32F303 board.

**Step 4:** Remove 5V from the USB data cable to eliminate backfeeding and serial instability.

**Step 5:** Wire the right MCU serial addresses into `printer.cfg` [[5]](#ref-5) and verify motion before final assembly.
