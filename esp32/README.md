# ESP32 IoT Module — MediCare

This folder will contain the ESP32 firmware that reads (or simulates) blood
pressure, glucose, and heart-rate sensor data and pushes it to the MediCare
backend over HTTP.

Planned contents (added in **Phase 12** of the build):

- `medicare_esp32.ino` — main sketch: WiFi connect, read/simulate sensors,
  POST JSON to `POST /api/iot/health-data` with the `x-device-key` header,
  retry/backoff on failure, onboard LED status indication.
- `config.example.h` — copy to `config.h` and fill in your WiFi + backend
  + device key details (already scaffolded here).

## Wiring (real sensors, optional)

| Sensor | Signal | ESP32 Pin |
|---|---|---|
| BP module (e.g. via UART) | RX/TX | GPIO16/GPIO17 |
| Glucose module (analog) | AOUT | GPIO34 (ADC) |
| Heart-rate (e.g. MAX30102) | SDA/SCL | GPIO21/GPIO22 (I2C) |

If you don't have physical sensors, the sketch ships with a **simulation
mode** that generates realistic mock readings so the full pipeline (device →
backend → AI service → dashboard) can be demoed end-to-end.

## Setup

1. Install the Arduino IDE or PlatformIO.
2. Install board support for ESP32 (`esp32` by Espressif in Boards Manager).
3. Install the `ArduinoJson` library.
4. Copy `config.example.h` to `config.h` and fill in your values.
5. Flash `medicare_esp32.ino` to the board.
6. Open Serial Monitor at 115200 baud to see connection and upload logs.
