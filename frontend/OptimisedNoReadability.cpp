#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <FS.h>
#include <SoftwareSerial.h>

#define MYPORT_TX 13  // D7
#define MYPORT_RX 12  // D6

SoftwareSerial arduinoSerial(MYPORT_RX, MYPORT_TX, false);

const char* ssid = "SCMS_RESEARCH";
const char* password = "S0nny@AUT";
const char* mqtt_server = "172.16.24.139";

struct ControllerSettings {
  double kp;
  double ki;
  double kd;
  int stepperState;
  int rpm;
  int steps;
};

const char* ID = "T1";
ControllerSettings settings = {0, 0, 0, 0, 20, 0};

WiFiClient espClient;
PubSubClient client(espClient);
const int MSG_BUFFER_SIZE = 512;

void setup_wifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  randomSeed(micros());
}

void callback(char* topic, byte* payload, unsigned int length) {
  char settingsTopic[20];
  sprintf(settingsTopic, "SETTINGS_%s", ID);
  if (strcmp(topic, settingsTopic) == 0) {
    DynamicJsonDocument doc(200);
    DeserializationError error = deserializeJson(doc, payload, length);
    if (!error) {
      settings.kp = doc["kp"];
      settings.ki = doc["ki"];
      settings.kd = doc["kd"];
      settings.stepperState = doc["stepperState"];
      settings.rpm = doc["rpm"];
      settings.steps = doc["steps"];
      updateControllerSettings();
      saveSettings();
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      char topicName[20];
      sprintf(topicName, "SETTINGS_%s", ID);
      client.subscribe(topicName);
    } else { delay(5000); }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
  digitalWrite(BUILTIN_LED, HIGH);
  Serial.begin(9600);
  setup_wifi();
  digitalWrite(BUILTIN_LED, LOW);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  SPIFFS.begin();
  readSavedSettings();
}

void updateControllerSettings() {
  DynamicJsonDocument doc(200);
  doc["type"] = "SETTINGS";
  doc["stepperState"] = settings.stepperState;
  doc["rpm"] = settings.rpm;
  doc["steps"] = settings.steps;
  doc["kp"] = settings.kp;
  doc["ki"] = settings.ki;
  doc["kd"] = settings.kd;
  serializeJson(doc, arduinoSerial);
  arduinoSerial.write('\n');
  settings.steps = 0;
}

bool saveSettings() {
  SPIFFS.remove("settings.json");
  File file = SPIFFS.open("settings.json", "w");
  if (!file) { return false; }
  DynamicJsonDocument doc(200);
  doc["stepperState"] = settings.stepperState;
  doc["rpm"] = settings.rpm;
  doc["steps"] = settings.steps;
  doc["kp"] = settings.kp;
  doc["ki"] = settings.ki;
  doc["kd"] = settings.kd;
  if (serializeJson(doc, file) == 0) { return false; }
  file.close();
  return true;
}

bool readSavedSettings() {
  File file = SPIFFS.open("settings.json", "r");
  if (!file) { return false; }
  DynamicJsonDocument doc(200);
  DeserializationError error = deserializeJson(doc, file);
  if (!error) {
    settings.stepperState = doc["stepperState"];
    settings.rpm = doc["rpm"];
    settings.steps = doc["steps"];
    settings.kp = doc["kp"];
    settings.ki = doc["ki"];
    settings.kd = doc["kd"];
  }
  file.close();
  return true;
}

void loop() {
  if (!client.connected()) { reconnect(); }
  client.loop();
  if (arduinoSerial.available()) {
    char buffer[MSG_BUFFER_SIZE] = "";
    arduinoSerial.readBytesUntil('\n', buffer, MSG_BUFFER_SIZE);
    DynamicJsonDocument doc(MSG_BUFFER_SIZE);
    DeserializationError error = deserializeJson(doc, buffer);
    if (!error) {
      if (doc["type"] == "METRICS") {
        DynamicJsonDocument turbineData(250);
        turbineData["id"] = ID;
        turbineData["memory"] = doc["memory"];
        turbineData["voltage"] = doc["voltage"];
        turbineData["stepperState"] = settings.stepperState;
        turbineData["rpm"] = settings.rpm;
        turbineData["rotation"] = doc["rotation"];
        turbineData["kp"] = settings.kp;
        turbineData["ki"] = settings.ki;
        turbineData["kd"] = settings.kd;
        char dataBuffer[250] = "";
        serializeJson(turbineData, dataBuffer);
        client.publish("TURBINE_FEED", dataBuffer);
      } else if (doc["type"] == "INIT_REQ") {
        updateControllerSettings();
      } else if (doc["type"] == "PID") {
        DynamicJsonDocument pidData(300);
        pidData["id"] = ID;
        pidData["interval"] = doc["interval"];
        pidData["rotations"] = doc["rotations"];
        pidData["errors"] = doc["errors"];
        char dataBuffer[300] = "";
        serializeJson(pidData, dataBuffer);
        client.publish("PID_FEED", dataBuffer);
      }
    }
  }
}
