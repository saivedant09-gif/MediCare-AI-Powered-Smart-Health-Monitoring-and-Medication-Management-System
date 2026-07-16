#ifndef CONFIG_H
#define CONFIG_H

// WiFi credentials
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Backend API
#define API_BASE_URL "http://YOUR_BACKEND_HOST:5000/api"
#define API_ENDPOINT "/iot/health-data"

// Device identity (must be registered/allowed on the backend)
#define DEVICE_ID "ESP32_PATIENT_001"
#define PATIENT_ID "PAT001"

// Device API key (matches IOT_API_KEY in backend/.env)
#define DEVICE_API_KEY "YOUR_IOT_API_KEY"

// Reading interval in milliseconds
#define READING_INTERVAL_MS 60000

#endif
