---
title: "ESP32-S3 a Tuya Smart Life přes BLE: řídicí jednotka žaluzií Warema"
description: "Dokumentace osmikanálové RF brány Warema EWFS s ESP32-S3 a CC1101, včetně konfigurace Tuya IoT Data Points a firmwaru Tuya BLE v PlatformIO."
pubDate: 2026-10-30
tags: ["ESP32-S3", "Tuya BLE", "chytrá domácnost", "PlatformIO"]
---

# Řídicí jednotka žaluzií Warema: ESP32-S3, Tuya BLE

Dokumentace popisuje architekturu, cloudovou konfiguraci, zapojení hardwaru
a firmware pro připojení **ESP32-S3** a vysílače **CC1101** do systému
**Smart Life (Tuya)** přes víceprotokolovou bránu Tuya Zigbee/Bluetooth.

## 1. Architektura systému

ESP32-S3 nepodporuje Zigbee přímo, proto komunikuje s lokální víceprotokolovou
bránou Tuya přes **Bluetooth Low Energy (Tuya BLE)**. Brána předává BLE zprávy
přes Wi-Fi do Tuya Cloudu a aplikace Smart Life. ESP32-S3 převádí příkazy Data
Point (DP) na RF rámce 433,92 nebo 868 MHz pomocí CC1101.

```text
+------------------+     Wi-Fi / cloud      +-----------------------+
| Aplikace Smart Life| <-------------------> | Víceprotokolová brána |
+------------------+                         +-----------------------+
                                                        ^
                                                        | Tuya BLE
                                                        v
+------------------+      SPI (433/868 MHz)  +-----------------------+
| Žaluzie Warema   | <------------------------ | ESP32-S3 + CC1101    |
+------------------+                           +-----------------------+
```

### Hlavní součásti

- **Mikrokontrolér:** ESP32-S3 (např. ESP32-S3-DevKitC-1 N16R8)
- **RF vysílač:** modul Texas Instruments CC1101
- **Brána chytré domácnosti:** dvoupásmová brána Tuya Multi-Mode (Zigbee + BLE)
- **Vývojové prostředí:** Visual Studio Code s PlatformIO

## 2. Zapojení ESP32-S3 a CC1101

Modul CC1101 připojte k výchozím pinům FSPI / SPI2 na ESP32-S3:

| Pin CC1101 | GPIO ESP32-S3 | Funkce |
| :--- | :--- | :--- |
| **VCC** | `3V3` | Napájení 3,3 V *(nepřipojujte 5 V)* |
| **GND** | `GND` | Společná zem |
| **CSN (CS)** | `GPIO 10` | Výběr zařízení SPI |
| **SCK** | `GPIO 12` | Hodiny SPI |
| **MOSI** | `GPIO 11` | Data z řadiče do zařízení |
| **MISO** | `GPIO 13` | Data ze zařízení do řadiče |
| **GDO0** | `GPIO 4` | RF data / přerušovací pin |
| **GDO2** | `GPIO 5` | Volitelný stav / detekce nosné |

## 3. Konfigurace platformy Tuya IoT

Pro autorizaci vlastního hardwaru na bráně Tuya zaregistrujte produkt na
[Tuya Developer Platform](https://platform.tuya.com/) a získejte tři
identifikátory: **PID**, **UUID** a **AuthKey**.

### 3.1 Vytvoření produktu

1. Na platformě Tuya otevřete v levém panelu **AI Product** → **Create**.
2. Zvolte **Standard Category** → **Electrical** → **Curtain Switch**.
   - Nevybírejte **Gateway Control**; tato kategorie je určena fyzickým
     koordinátorům Zigbee/Wi-Fi, nikoli koncovým akčním členům.
3. V nabídce **Select a smart mode** zvolte **TuyaOS**.
4. Přepněte z **No-Code Development** na kartu **Custom Solution**.
5. Jako komunikační protokol zvolte **Bluetooth LE**, pojmenujte produkt
   (např. *Warema ESP32 Controller*) a klikněte na **Create**.
6. Poznamenejte si vygenerované osmiznakové **Product ID (PID)**.

### 3.2 Definice datových bodů (DP)

Standardní spínače závěsů Tuya poskytují nativní datové body jen pro jeden až
dva kanály. Pro osm nezávislých kanálů Warema, skupinové příkazy a rozlišení
plného pohybu (`up`, `down`, `stop`) od krokového naklápění (`step_up`,
`step_down`) nastavte standardní i vlastní funkce:

#### Standardní funkce

| ID DP | Název DP | Identifikátor | Přenos dat | Typ | Hodnoty enum |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | CH1-4 | `control` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **4** | CH5-8 | `control_2` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |

#### Vlastní funkce (kanály 1–8)

| ID DP | Název DP | Identifikátor | Přenos dat | Typ | Hodnoty enum |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **101** | CH1 | `channel1` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **102** | CH2 | `channel2` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **103** | CH3 | `channel3` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **104** | CH4 | `channel4` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **105** | CH5 | `channel5` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **106** | CH6 | `channel6` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **107** | CH7 | `channel7` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **108** | CH8 | `channel8` | Odeslat a nahlásit | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |

**Odeslat a nahlásit** umožňuje obousměrnou komunikaci: aplikace Smart Life
odešle příkaz a ESP32-S3 následně vrátí provedený stav do uživatelského rozhraní.

### 3.3 Ovládací panel zařízení

1. Otevřete **Device Interaction** a zvolte **DIY Style Panel on Studio**.
2. Vykreslení panelu je oddělené od firmwaru a řídí se ID datových bodů.
   Názvy tlačítek, ikony i rozvržení proto můžete ve Studio Panelu měnit bez
   opětovného nahrání firmwaru do ESP32-S3.

### 3.4 Vývoj hardwaru a bezplatné licence (UUID a AuthKey)

1. Otevřete **Hardware Development** a jako režim přístupu ke cloudu zvolte
   **MCU SDK**.
2. V části **Custom Firmware** vyberte **+ Add Custom Firmware**:
   - nastavte typ protokolu na **Bluetooth**,
   - vytvořte firmware verze `1.0.0`, nahrajte zástupný soubor `.bin` a zvolte
     **Save and Enable**.
3. Vyberte referenční modul ze seznamu hardwaru (např. **BT3L Bluetooth
   Module**); tím zpřístupníte podklady k hardwaru a ladicí licence.
4. Klikněte na **Get 2 Free Licenses**:
   - účel nákupu nastavte na **Debugging**,
   - způsob doručení změňte z **Credential** na **License List**; získáte
     prosté textové údaje místo binárních souborů pro výrobu,
   - potvrďte objednávku za `$0.00` a stáhněte seznam licencí s **UUID** a
     **AuthKey**.

## 4. Nastavení PlatformIO (`platformio.ini`)

Ve VS Code založte projekt PlatformIO pro ESP32-S3 a přidejte závislosti na
NimBLE / Tuya BLE a CC1101:

```ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
monitor_speed = 115200

build_flags =
    -DARDUINO_USB_CDC_ON_BOOT=1
    -DBOARD_HAS_PSRAM

lib_deps =
    lsatan/SmartRC-CC1101-Driver-Lib@^2.5.7
    ; Add your Tuya BLE Arduino/ESP32 port library here
```

## 5. Implementace firmwaru (`src/main.cpp`)

Firmware inicializuje rádio CC1101 i zásobník Tuya BLE, mapuje příchozí datové
body (`1`, `4` a `101`–`108`) na RF příkazy Warema a vrací stav do brány.
V konfiguračním souboru doplňte vlastní hodnoty PID, UUID a AuthKey; tajné
údaje nevkládejte do veřejného repozitáře.

```cpp
#include <Arduino.h>
#include <SPI.h>
#include <ELECHOUSE_CC1101_SRC_DRV.h>
#include "tuya_ble_api.h"

#define TUYA_DEVICE_PID      "**********"
#define TUYA_DEVICE_UUID     "YOUR_16_CHAR_UUID"
#define TUYA_DEVICE_AUTHKEY  "YOUR_32_CHAR_AUTHKEY"
#define TUYA_DEVICE_VER      "1.0.0"

#define CC1101_SCK   12
#define CC1101_MISO  13
#define CC1101_MOSI  11
#define CC1101_CSN   10
#define CC1101_GDO0  4

enum WaremaCommand : uint8_t {
    CMD_UP = 0, CMD_DOWN = 1, CMD_STOP = 2,
    CMD_STEP_UP = 3, CMD_STEP_DOWN = 4
};

void transmitWaremaCommand(uint8_t channelMask, uint8_t command) {
    Serial.printf("[RF TX] Channel Mask: 0x%02X | Command: %d\n", channelMask, command);
    // Doplnit kódování rámce Warema EWFS a sekvenci vysílání CC1101.
}

static void tuya_ble_event_callback(tuya_ble_cb_evt_param_t* event) {
    switch (event->evt) {
        case TUYA_BLE_CB_EVT_CONNECTE_STATUS:
            Serial.printf("[TUYA BLE] Connection state changed: %d\n", event->connect_status);
            break;
        case TUYA_BLE_CB_EVT_DP_WRITE: {
            uint8_t dp_id = event->dp_write_data.dp_id;
            uint8_t dp_type = event->dp_write_data.dp_type;
            uint8_t cmd_val = event->dp_write_data.dp_data[0];
            if (dp_id == 1) transmitWaremaCommand(0x0F, cmd_val);
            else if (dp_id == 4) transmitWaremaCommand(0xF0, cmd_val);
            else if (dp_id >= 101 && dp_id <= 108)
                transmitWaremaCommand(1 << (dp_id - 101), cmd_val);
            uint8_t report_buf[4] = { dp_id, dp_type, 0x01, cmd_val };
            tuya_ble_dp_data_report(report_buf, sizeof(report_buf));
            break;
        }
        default:
            break;
    }
}

void setup() {
    Serial.begin(115200);
    delay(1000);
    SPI.begin(CC1101_SCK, CC1101_MISO, CC1101_MOSI, CC1101_CSN);
    ELECHOUSE_cc1101.setSpiPin(CC1101_SCK, CC1101_MISO, CC1101_MOSI, CC1101_CSN);
    ELECHOUSE_cc1101.setGDO0(CC1101_GDO0);
    if (ELECHOUSE_cc1101.getCC1101()) {
        ELECHOUSE_cc1101.Init();
        ELECHOUSE_cc1101.setMHZ(433.92); // Pro pohony 868 MHz použijte 868.30.
    } else {
        Serial.println("[CC1101] Connection Error! Check wiring.");
    }
    tuya_ble_device_param_t device_param = {0};
    memcpy(device_param.product_id, TUYA_DEVICE_PID, 8);
    memcpy(device_param.device_id, TUYA_DEVICE_UUID, 16);
    memcpy(device_param.auth_key, TUYA_DEVICE_AUTHKEY, 32);
    device_param.product_id_len = 8;
    device_param.bound_flag = 0;
    tuya_ble_sdk_init(&device_param);
    tuya_ble_callback_queue_register(tuya_ble_event_callback);
}

void loop() {
    tuya_ble_main_tasks();
}
```

## 6. Spárování se Smart Life

1. Nahrajte firmware do **ESP32-S3** přes PlatformIO a otevřete sériový monitor
   (`115200 baud`); ověřte hlášení `[CC1101] SPI Connection OK` a
   `[TUYA BLE] Advertising started`.
2. V telefonu otevřete aplikaci **Smart Life** a zkontrolujte, že je
   víceprotokolová brána Tuya Zigbee/BLE online.
3. Zvolte **Multi-Mode Gateway** → **Add Device** (nebo **Search for Bluetooth
   devices**).
4. Brána vyhledá ESP32-S3 vysílající PID `**********`, ověří jej pomocí UUID
   a AuthKey a přidá do domácnosti.
5. V panelu zařízení budou dostupné skupiny `CH1-4`, `CH5-8` i všech osm
   samostatných kanálů `CH1`–`CH8`.
