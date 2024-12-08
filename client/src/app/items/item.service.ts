import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'https://your-api-url.com/items';

  constructor(private http: HttpClient) {}

  addItem(itemData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, itemData);
  }

  getItemById(itemId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${itemId}`);
  }

  updateItem(itemId: string, itemData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${itemId}`, itemData);
  }
}


/*import { Injectable } from '@angular/core';

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
*/