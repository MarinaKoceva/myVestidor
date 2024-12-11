import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.userService.isLogged;
    console.log('AuthGuard: isLogged:', isLogged); // Диагностика
    if (isLogged) {
      return true;
    } else {
      console.warn('AuthGuard: User not logged in. Redirecting to /login');
      this.router.navigate(['/login']);
      return false;
    }
  }
  

  isAuthenticated(): boolean {
    // Логика за проверка дали потребителят е удостоверен
    return !!localStorage.getItem('authToken'); 
  }
}
