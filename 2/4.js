const fs = require("fs");
const { promises: fsPromises } = fs;
const diff = require("diff");

const directoryToWatch = "./watch";

const files = [];

// Функция для вывода названия новых файлов
function handleFileCreation(filename) {
  console.log(`Создан новый файл: ${filename}`);
}

// Функция для сравнения двух версий файла и вывода различий
function compareFileVersions(previousContent, currentContent) {
  const differences = diff.diffLines(previousContent, currentContent);

  differences.forEach((part) => {
    const prefix = part.added ? "+" : part.removed ? "-" : " ";
    const lines = part.value.split("\n").map((line) => `${prefix} ${line}`);
    console.log(lines.join("\n"));
  });
}

// Создаем наблюдатель за каталогом
const watcher = fs.watch(directoryToWatch, (eventType, filename) => {
  if (eventType === "rename" && filename) {
    // Проверяем, что событие - это создание файла
    fsPromises
      .access(`${directoryToWatch}/${filename}`, fs.constants.F_OK)
      .then(() => {
        handleFileCreation(filename);
        files[filename] = "";
      })
      .catch((error) => {
        console.error("Ошибка доступа к файлу:", error);
      });
  }
  if (eventType === "change") {
    const readStream = fs.createReadStream(
      directoryToWatch + "/" + filename,
      "utf8"
    );
    let newFileContent = "";
    readStream.on("data", (chunk) => {
      newFileContent += chunk;
    });

    readStream.on("end", () => {
      console.log("\nИзменения в файле:");
      compareFileVersions(files[filename], newFileContent);
      files[filename] = newFileContent;
    });
  }
});

watcher.on("error", (error) => {
  console.error("Ошибка при наблюдении за каталогом:", error);
});
