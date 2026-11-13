---
title: "Integrating ESP32-S3 with Tuya Smart Life via BLE Gateway: Warema Blinds Controller"
description: "Complete project documentation for building an 8-channel Warema EWFS roller blind RF gateway on ESP32-S3 and CC1101, configuring Tuya IoT Platform Data Points, and implementing Tuya BLE firmware in PlatformIO."
pubDate: 2026-10-30
tags: ["ESP32-S3", "Tuya BLE", "Smart Home", "PlatformIO"]
---

# ESP32-S3 Tuya BLE Warema Blinds Controller

This documentation covers the complete end-to-end architecture, cloud configuration, hardware wiring, and firmware implementation for integrating an **ESP32-S3** and **CC1101** transceiver into the **Smart Life (Tuya)** ecosystem via a **Tuya Zigbee/Bluetooth Multi-Mode Gateway**.

---

## 1. System Architecture

Because the ESP32-S3 does not natively support Zigbee, it communicates with the local Tuya Multi-Mode Hub using **Bluetooth Low Energy (Tuya BLE)**. The hub bridges the local BLE packets over Wi-Fi to the Tuya Cloud and Smart Life mobile application, while the ESP32-S3 translates incoming Data Point (DP) commands into 433.92 MHz / 868 MHz RF frames via the CC1101 transceiver.

```text
+------------------+     Wi-Fi / Cloud     +-----------------------+
|  Smart Life App  | <-------------------> | Tuya Multi-Mode Hub   |
+------------------+                       +-----------------------+
                                                       ^
                                                       | Tuya BLE
                                                       v
+------------------+    SPI (433/868MHz)   +-----------------------+
|  Warema Blinds   | <-------------------- |   ESP32-S3 + CC1101   |
+------------------+                       +-----------------------+
```

### Core Components
* **Microcontroller:** ESP32-S3 (e.g., ESP32-S3-DevKitC-1 N16R8)
* **RF Transceiver:** Texas Instruments CC1101 module
* **Smart Home Bridge:** Tuya Dual-Band Multi-Mode Gateway (Zigbee + BLE)
* **IDE & Build System:** Visual Studio Code with PlatformIO

---

## 2. Hardware Wiring (ESP32-S3 to CC1101)

Connect the CC1101 module to the ESP32-S3 default FSPI / SPI2 pins as follows:

| CC1101 Pin | ESP32-S3 GPIO | Function |
| :--- | :--- | :--- |
| **VCC** | `3V3` | 3.3V Power Supply *(Do NOT use 5V)* |
| **GND** | `GND` | Common Ground |
| **CSN (CS)** | `GPIO 10` | SPI Chip Select |
| **SCK** | `GPIO 12` | SPI Clock |
| **MOSI** | `GPIO 11` | SPI Master Out Slave In |
| **MISO** | `GPIO 13` | SPI Master In Slave Out |
| **GDO0** | `GPIO 4` | RF Data / Interrupt Pin |
| **GDO2** | `GPIO 5` | Optional Status / Carrier Sense |

---

## 3. Tuya IoT Platform Configuration

To authorize custom hardware on a Tuya Gateway, you must register a product on the [Tuya Developer Platform](https://platform.tuya.com/) and obtain three identifiers: **PID**, **UUID**, and **AuthKey**.

### Step 3.1: Product Creation
1. Open the Tuya Developer Platform and navigate to **AI Product** $\rightarrow$ **Create** in the left sidebar.
2. Select **Standard Category** $\rightarrow$ **Electrical** $\rightarrow$ **Curtain Switch**.
   * *Note:* Do not choose *Gateway Control*, as that category is reserved for physical Zigbee/Wi-Fi hub coordinators rather than end-node actuators.
3. Under **Select a smart mode**, choose **TuyaOS**.
4. Switch from *No-Code Development* to the **Custom Solution** tab.
5. Select **Bluetooth LE** as the communication protocol, name your product (e.g., *Warema ESP32 Controller*), and click **Create**.
6. Record the generated 8-character **Product ID (PID)**.

### Step 3.2: Data Points (DP) Definition
Standard Tuya Curtain Switches only provide native Data Points for 1 to 2 channels. To control **8 independent Warema channels**, support group commands, and distinguish between full travel (`up`, `down`, `stop`) and slat stepping (`step_up`, `step_down`), configure both Standard and Custom Functions:

#### Standard Functions
| DP ID | DP Name | Identifier | Data Transfer Type | Data Type | Enum Values |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | CH1-4 | `control` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **4** | CH5-8 | `control_2` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |

#### Custom Functions (Channels 1–8)
| DP ID | DP Name | Identifier | Data Transfer Type | Data Type | Enum Values |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **101** | CH1 | `channel1` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **102** | CH2 | `channel2` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **103** | CH3 | `channel3` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **104** | CH4 | `channel4` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **105** | CH5 | `channel5` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **106** | CH6 | `channel6` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **107** | CH7 | `channel7` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |
| **108** | CH8 | `channel8` | Send and Report | Enum | `up`, `down`, `stop`, `step_up`, `step_down` |

* **Data Transfer Type (`Send and Report`):** Enables bidirectional communication—the Smart Life app sends commands (`Send`), and the ESP32-S3 reports the executed state back to the UI (`Report`).

### Step 3.3: Device Interaction (UI Panel)
1. Proceed to **Device Interaction** and select **DIY Style Panel on Studio**.
2. Because UI rendering is decoupled from firmware and relies strictly on DP IDs, button names, icons, and layouts can be modified in Studio Panel at any time without reflashing the ESP32-S3.

### Step 3.4: Hardware Development & Free Licenses (UUID & AuthKey)
1. Navigate to **Hardware Development** and select **MCU SDK** as the Cloud Access Mode.
2. Under *Custom Firmware*, click **+ Add Custom Firmware**:
   * Set Protocol Type to **Bluetooth**.
   * Create firmware version `1.0.0`, upload a placeholder `.bin` file, and click **Save and Enable**.
3. Select a reference module from the hardware list (such as **BT3L Bluetooth Module**) to unlock hardware deliverables and debugging licenses.
4. Click **Get 2 Free Licenses**:
   * Set **Purchase Purpose** to **Debugging**.
   * Change **Delivery Mode** from *Credential* to **License List** (this provides plain-text strings rather than factory-flashing binaries).
   * Confirm the `$0.00` order and download the **License List** file containing your **UUID** and **AuthKey**.

---

## 4. PlatformIO Configuration (`platformio.ini`)

Create a new project in VS Code using PlatformIO for the ESP32-S3 and configure `platformio.ini` with NimBLE / Tuya BLE and CC1101 dependencies:

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

---

## 5. Firmware Implementation (`src/main.cpp`)

The following C++ implementation initializes the CC1101 radio and the Tuya BLE stack, maps incoming Data Points (`1`, `4`, and `101`–`108`) to Warema RF commands, and reports state updates back to the gateway:

```cpp
#include <Arduino.h>
#include <SPI.h>
#include <ELECHOUSE_CC1101_SRC_DRV.h>
#include "tuya_ble_api.h"

// ==========================================
// 1. TUYA CREDENTIALS (From License List)
// ==========================================
#define TUYA_DEVICE_PID      "**********"
#define TUYA_DEVICE_UUID     "YOUR_16_CHAR_UUID"
#define TUYA_DEVICE_AUTHKEY  "YOUR_32_CHAR_AUTHKEY"
#define TUYA_DEVICE_VER      "1.0.0"

// ==========================================
// 2. CC1101 PIN DEFINITIONS (ESP32-S3)
// ==========================================
#define CC1101_SCK   12
#define CC1101_MISO  13
#define CC1101_MOSI  11
#define CC1101_CSN   10
#define CC1101_GDO0  4

// ==========================================
// 3. ENUM MAPPING (Matches Tuya Portal Order)
// ==========================================
enum WaremaCommand : uint8_t {
    CMD_UP        = 0,
    CMD_DOWN      = 1,
    CMD_STOP      = 2,
    CMD_STEP_UP   = 3,
    CMD_STEP_DOWN = 4
};

// ==========================================
// 4. WAREAMA RF TRANSMISSION LOGIC
// ==========================================
void transmitWaremaCommand(uint8_t channelMask, uint8_t command) {
    Serial.printf("[RF TX] Channel Mask: 0x%02X | Command: %d\n", channelMask, command);

    // TODO: Insert your specific Warema EWFS frame encoding and CC1101 TX sequence here
    // Example:
    // ELECHOUSE_cc1101.SetTx();
    // ELECHOUSE_cc1101.SendData(frameBuffer, frameLength);
    // ELECHOUSE_cc1101.SetRx();
}

// ==========================================
// 5. TUYA BLE CALLBACK HANDLER
// ==========================================
static void tuya_ble_event_callback(tuya_ble_cb_evt_param_t* event) {
    switch (event->evt) {
        case TUYA_BLE_CB_EVT_CONNECTE_STATUS:
            Serial.printf("[TUYA BLE] Connection state changed: %d\n", event->connect_status);
            break;

        case TUYA_BLE_CB_EVT_DP_WRITE: {
            uint8_t dp_id   = event->dp_write_data.dp_id;
            uint8_t dp_type = event->dp_write_data.dp_type;
            uint8_t cmd_val = event->dp_write_data.dp_data[0];

            Serial.printf("[TUYA BLE] DP Write -> ID: %d | Type: %d | Val: %d\n", dp_id, dp_type, cmd_val);

            // Handle Group Controls (Standard DPs 1 and 4)
            if (dp_id == 1) {
                // CH1-4 Group (Bitmask 0b00001111 = 0x0F)
                transmitWaremaCommand(0x0F, cmd_val);
            } 
            else if (dp_id == 4) {
                // CH5-8 Group (Bitmask 0b11110000 = 0xF0)
                transmitWaremaCommand(0xF0, cmd_val);
            } 
            // Handle Individual Channels 1-8 (Custom DPs 101-108)
            else if (dp_id >= 101 && dp_id <= 108) {
                uint8_t channelIndex = dp_id - 101; // 0 to 7
                uint8_t channelMask  = (1 << channelIndex);
                transmitWaremaCommand(channelMask, cmd_val);
            }

            // Report state back to Smart Life App ("Send and Report")
            uint8_t report_buf[4] = { dp_id, dp_type, 0x01, cmd_val };
            tuya_ble_dp_data_report(report_buf, sizeof(report_buf));
            break;
        }

        default:
            break;
    }
}

// ==========================================
// 6. SETUP & MAIN LOOP
// ==========================================
void setup() {
    Serial.begin(115200);
    delay(1000);
    Serial.println("Starting ESP32-S3 Warema Tuya BLE Gateway...");

    // Initialize SPI & CC1101
    SPI.begin(CC1101_SCK, CC1101_MISO, CC1101_MOSI, CC1101_CSN);
    ELECHOUSE_cc1101.setSpiPin(CC1101_SCK, CC1101_MISO, CC1101_MOSI, CC1101_CSN);
    ELECHOUSE_cc1101.setGDO0(CC1101_GDO0);

    if (ELECHOUSE_cc1101.getCC1101()) {
        Serial.println("[CC1101] SPI Connection OK");
        ELECHOUSE_cc1101.Init();
        ELECHOUSE_cc1101.setMHZ(433.92); // Adjust to 868.30 if using 868 MHz Warema actuators
    } else {
        Serial.println("[CC1101] Connection Error! Check wiring.");
    }

    // Initialize Tuya BLE SDK Parameters
    tuya_ble_device_param_t device_param = {0};
    memcpy(device_param.product_id, TUYA_DEVICE_PID, 8);
    memcpy(device_param.device_id,  TUYA_DEVICE_UUID, 16);
    memcpy(device_param.auth_key,   TUYA_DEVICE_AUTHKEY, 32);
    device_param.product_id_len = 8;
    device_param.bound_flag     = 0;

    tuya_ble_sdk_init(&device_param);
    tuya_ble_callback_queue_register(tuya_ble_event_callback);
    Serial.println("[TUYA BLE] Advertising started.");
}

void loop() {
    tuya_ble_main_tasks();
}
```

---

## 6. Pairing with Smart Life

1. Flash the firmware to the **ESP32-S3** using PlatformIO and open the Serial Monitor (`115200 baud`) to verify `[CC1101] SPI Connection OK` and `[TUYA BLE] Advertising started`.
2. Open the **Smart Life** app on your mobile device and ensure your **Tuya Zigbee/BLE Multi-Mode Gateway** is online.
3. Tap on the **Multi-Mode Gateway** $\rightarrow$ **Add Device** (or **Search for Bluetooth devices**).
4. The gateway will detect the ESP32-S3 broadcasting PID `**********`, authenticate it via your UUID/AuthKey, and bind it to your home.
5. Once paired, open the device panel to access group controls (`CH1-4`, `CH5-8`) and all 8 individual channel controllers (`CH1`–`CH8`).