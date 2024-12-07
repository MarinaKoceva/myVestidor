import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Гарантира, че сервизът е достъпен навсякъде в приложението
})
export class ItemService {
  private items: any[] = [
    {
      name: 'Item 1',
      price: 8,
      brand: 'Brand A',
      image: './item1.png',
      isNew: true,
    },
    {
      name: 'Item 2',
      price: 20,
      brand: 'Brand B',
      image: './item2.png',
      isNew: false,
    },
    {
      name: 'Item 3',
      price: 10,
      brand: 'Brand C',
      image: './item3.png',
      isNew: true,
    },
  ];

  // Вземете всички елементи
  getItems() {
    return this.items;
  }

  // Добавете нов елемент
  addItem(item: any) {
    this.items.push(item);
  }
}
