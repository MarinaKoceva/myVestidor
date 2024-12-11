import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError, Observable, from } from 'rxjs';
import { Item } from '../types/item';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/item/';

  constructor(private http: HttpClient, private userService: UserService) { }

  addItem(itemData: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return throwError(() => new Error('Unauthorized: Access token is missing.'));
    }

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': token,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}`, { ...itemData, price: Number(itemData.price) }, { headers: httpHeaders });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getItemById(itemId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${itemId}`);
  }

  getItems(category: string | null): Observable<any[]> {
    const url = category ? `${this.apiUrl}?where=category%3D%22${category}%22` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  updateItem(itemId: string, itemData: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return throwError(() => new Error('Unauthorized: Access token is missing.'));
    }

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': token,
      'Content-Type': 'application/json',
    });

    return this.http.put(this.apiUrl + itemId, itemData, { headers: httpHeaders }).pipe(
      catchError((error) => {
        console.error('Error updating item:', error.message || error);
        return throwError(() => new Error('Failed to update the item. Please try again later.'));
      })
    );
  }

  deleteItem(id: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    console.log(token);

    if (!token) {
      return throwError(() => new Error('Unauthorized: Access token is missing.'));
    }

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': token,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.apiUrl}${id}`, { headers: httpHeaders }).pipe(
      catchError((error) => {
        console.error('Error updating item:', error.message || error);
        return throwError(() => new Error('Failed to update the item. Please try again later.'));
      }));
  }

  buyItem(itemData: Item) {
    return emailjs.send("service_9mc6blk", "template_0xsb92g",
      {
        title: itemData.title,
        price: itemData.price,
        size: itemData.size,
        category: itemData.category,
        brand: itemData.brand,
        condition: itemData.condition,
        message: `Successful purchase of ${itemData.title}`,
        email: this.userService.user?.email
      },
      { publicKey: "bem3832fkOlCTZv9b" })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to send email");
        }
      })
      .catch((err) => console.error(err));
  }
}
