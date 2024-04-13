"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.


Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

const Cooks = new Map([
  ["Пицца", "Олег"],
  ["Суши", "Андрей"],
  ["Десерт", "Анна"],
]);

const menubar = new Map([
  ["Пицца", new Set(["Маргарита", "Пепперони", "Три сыра"])],
  ["Суши", new Set(["Филадельфия", "Калифорния", "Чизмаки", "Сеякемаки"])],
  ["Десерты", new Set(["Тирамису", "Чизкейк"])],
]);

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  finalOrder = new Map();
  count;
  newOrder(client, ...order) {
    this.count = 0;
    order.forEach((item) => {
      if (menubar.get(item.type).has(item.name)) {
        this.count++;
      }
   });
    if (this.finalOrder.get(client) === undefined) {
      if(this.count === order.length) {
      this.finalOrder.set(client, order);
    } else {
      if (this.count === order.length) {
        this.finalOrder.get(client).push(...order);
      }
    }
    if (this.count === order.length) {
      console.log(`Клиент ${client.firstname} заказал: `);
      const arr = formatArray(this.finalOrder.get(client));
      arr.forEach((item) => {
        console.log(`${item.name} - ${item.quantity} - готовит повар ${Cooks.get(item.type)}`);
      });
    }
    }
  } 
}

const formatArray = (arr) => {
  let str = "";
  let index;
  for (let i = 0; i < arr.length; i++) {
    str = arr[i].name;
    for (let j = 0; j < arr[i].quantity; j++) {
      if (str === arr[j].name) {
        arr[i].quantity = arr[i].quantity + arr[j].quantity;
        index = j;
      }
    }
  }
  delete arr[index];
  return arr;
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
// manager.newOrder(
//   new Client("Иван", "Иванов"), 
//   { name: "Маргарита", quantity: 1, type: "Пицца" },
//   { name: "Пепперони", quantity: 2, type: "Пицца" },
//   { name: "Чизкейк", quantity: 1, type: "Десерт" },
// );
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.