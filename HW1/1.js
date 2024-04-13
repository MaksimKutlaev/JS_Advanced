"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const composition = [
  {title: "Название альбома1", artist: "Исполнитель1", year: "2000"},
  {title: "Название альбома2", artist: "Исполнитель2", year: "2001"},
  {title: "Название альбома3", artist: "Исполнитель3", year: "2002"},
];

const musicCollection = {
  composition,
  *[Symbol.iterator]() {
    for (let i = 0; i < this.composition.length; i++) {
      yield `${this.composition[i].title} - ${this.composition[i].artist} (${this.composition[i].year})`;
    }
  }
};

for (const composition of musicCollection) {
  console.log(composition);
}