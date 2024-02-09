const { promises: fsPromises } = require("fs");

exports.Helpers = class Helpers {
  static async asyncReadFile(filename) {
    const contents = await fsPromises.readFile(filename, "utf-8");
    return contents.split(/\r?\n/);
  }

    static async getRandomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  static async getRandomNumber(min, max) {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }
};
