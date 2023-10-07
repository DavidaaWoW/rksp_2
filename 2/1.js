const fs = require("fs");

const readStream = fs.createReadStream("file.txt", "utf8");

readStream.on("data", (chunk) => {
  console.log("Прочитано:", chunk);
});

readStream.on("end", () => {
  console.log("Чтение завершено");
});

readStream.on("error", (err) => {
  console.error("Произошла ошибка при чтении файла:", err);
});
