import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.isAuthenticated(); // Провери дали потребителят е логнат
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Пренасочва към login, ако не е логнат
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    // Добави логика за проверка дали потребителят е удостоверен
    return !!localStorage.getItem('authToken'); // Примерен механизъм
  }
}
