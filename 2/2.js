const fs = require("fs");
const readline = require("readline");

let FILENAME = "bigFile.txt";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

const createFile = (filePath) => {
  // Генерируем текст для заполнения файла
  const textToWrite =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  // Определяем размер файла в байтах (100 MB)
  const fileSizeInBytes = 100 * 1024 * 1024; // 1 MB = 1024 KB, 1 KB = 1024 bytes

  // Создаем буфер с текстом для записи в файл
  const buffer = Buffer.alloc(fileSizeInBytes, textToWrite);

  // Записываем данные в файл
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Произошла ошибка при создании файла:", err);
    } else {
      console.log(`Файл "${filePath}" успешно создан и заполнен данными.`);
    }
  });
};

const readFileAsync = async () => {
  fs.readFile(FILENAME, "utf8", (err, data) => {
    if (err) {
      console.error("Произошла ошибка при чтении файла:", err);
      return;
    }
    // console.log("Содержимое файла:", data);
  });
};

const readFileSync = () => {
  try {
    const data = fs.readFileSync(FILENAME, "utf8");
    // console.log('Содержимое файла:', data);
  } catch (err) {
    console.error("Произошла ошибка при чтении файла:", err);
  }
};

const readFileWithStream = async () => {
  const readStream = fs.createReadStream(FILENAME, "utf8");

  readStream.on("data", (chunk) => {
    //   console.log('Прочитано:', chunk);
  });

  readStream.on("end", () => {
    console.log("Чтение завершено");
  });

  readStream.on("error", (err) => {
    console.error("Произошла ошибка при чтении файла:", err);
  });
};

const readFileWithPromises = async () => {
  try {
    const data = await fs.promises.readFile(FILENAME, "utf8");
    // console.log("Содержимое файла:", data);
  } catch (err) {
    console.error("Произошла ошибка при чтении файла:", err);
  }
};

async function main() {
  let input = "";

  while (input !== "0") {
    input = await getUserInput(
      "1. Создать файл \n 2. Прочитать файл асинхронно \n 3. Прочитать файл синхронно \n 4. Прочитать файл с помощью потока \n \
5. Прочитать файл с использованием промисов \n 0. Выход \n"
    );
    switch (input) {
      case "1":
        const fileName = await getUserInput(
          "Введите название файла с расширением: "
        );
        createFile(fileName);
        FILENAME = fileName;
        break;
      case "2":
        console.time("Время выполнения функции");
        await readFileAsync();
        console.timeEnd("Время выполнения функции");
        break;
      case "3":
        console.time("Время выполнения функции");
        readFileSync();
        console.timeEnd("Время выполнения функции");
        break;
      case "4":
        console.time("Время выполнения функции");
        await readFileWithStream();
        console.timeEnd("Время выполнения функции");
        break;
      case "5":
        console.time("Время выполнения функции");
        await readFileWithPromises();
        console.timeEnd("Время выполнения функции");
        break;
    }
  }
}

main();
