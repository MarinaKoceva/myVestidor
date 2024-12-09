import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/item/';

  constructor(private http: HttpClient) {}

  addItem(itemData: any): Observable<any> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': localStorage.getItem('accessToken')!,
      'Content-Type': 'application/json',
    });
    
    return this.http.post(`${this.apiUrl}`, itemData, {headers: httpHeaders});
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }


  getItemById(itemId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${itemId}`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Връща списък с артикули
  }


  updateItem(itemId: string, itemData: any): Observable<any> {
    
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': localStorage.getItem('accessToken')!,
      'Content-Type': 'application/json',
    });
    
    return this.http.put(`${this.apiUrl}/${itemId}`, itemData, {headers: httpHeaders});
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