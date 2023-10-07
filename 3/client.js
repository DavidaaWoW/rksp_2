const io = require("socket.io-client");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const URL_co2 = "http://localhost:3022";
const URL_temp = "http://localhost:3023";

const socket_co2 = io(URL_co2);
const socket_temp = io(URL_temp);

const values = {
  co2: 0,
  temperature: 0,
};

const NORM = {
  temperature: 25,
  co2: 70,
};

const checkAlarm = (data, type) => {
  values[type] = data;
  if (values["temperature"] > NORM["temperature"]) {
    console.log(
      "Предупреждение! Значение температуры выше нормы: " +
        values["temperature"]
    );
  }
  if (values["co2"] > NORM["co2"]) {
    console.log("Предупреждение! Значение CO2 выше нормы: " + values["co2"]);
  }
  if (
    values["temperature"] > NORM["temperature"] &&
    values["co2"] > NORM["co2"]
  ) {
    console.log("ALARM!!!");
  }
};

socket_co2
  .on("connect", () => {
    console.log("Подключен к датчику co2");
  })
  .on("co2", (data) => {
    checkAlarm(data, "co2");
  });

socket_temp
  .on("connect", () => {
    console.log("Подключен к датчику температуры");
  })
  .on("temperature", (data) => {
    checkAlarm(data, "temperature");
  });

const PORT = 3025 || process.env.PORT;

server.listen(PORT, () => console.log("Client running on port " + PORT));
