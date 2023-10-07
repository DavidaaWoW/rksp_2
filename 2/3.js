const fs = require("fs");

// Функция для вычисления 16-битной контрольной суммы
function calculateChecksum(filePath) {
  let checksum = 0;

  try {
    const fileData = fs.readFileSync(filePath);
    const buffer = Buffer.from(fileData);

    for (let i = 0; i < buffer.length; i++) {
      checksum = (checksum + buffer[i]) & 0xffff;
    }

    return checksum;
  } catch (err) {
    console.error("Произошла ошибка при чтении файла:", err);
    return null;
  }
}

// Пример использования
const filePath = "bigFile.txt";
const result = calculateChecksum(filePath);

if (result !== null) {
  console.log(`16-битная контрольная сумма файла: 0x${result.toString(16)}`);
}
