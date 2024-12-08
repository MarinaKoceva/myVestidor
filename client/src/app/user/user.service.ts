import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
//TODO: Сървиси без login/register се нуждаят от ErrorHandling
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user)
        localStorage.setItem('accessToken', user.accessToken);
      }));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    const payload = {
      username,
      email,
      password,
      rePassword,
    };

    return this.http
      .post<UserForAuth>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(tap((user) => this.user$$.next(user)));
  }


  logout() {
    const token = localStorage.getItem('accessToken'); // Вземаме токена
    if (!token) {
      console.warn('No access token found in localStorage'); // Логваме предупреждение
      return; // Спираме изпълнението, ако токенът липсва
    }
  
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': token,
      'Content-Type': 'application/json',
    });
  
    this.http
      .get<unknown>(`${environment.apiUrl}/auth/logout`, { headers: httpHeaders })
      .subscribe({
        next: () => {
          this.user$$.next(null);
          localStorage.removeItem('accessToken');
        },
        error: (err) => {
          console.error('Error during logout:', err);
        },
      });
  }
  
  
  /*logout() {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': localStorage.getItem('accessToken')!,
      'Content-Type': 'application/json',
    });

    return this.http
      .get<unknown>(`${environment.apiUrl}/auth/logout`, { headers: httpHeaders })
      .subscribe(() => {
        this.user$$.next(null);
        localStorage.removeItem('accessToken');
      });
  }*/

  getProfile() {
    return this.http
      .get<UserForAuth>('/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string) {//tel?: string
    return this.http
      .put<UserForAuth>(`/users/profile`, {
        username,
        email,//tel
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}


/*import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = null;
    }
  }

  login() {
    this.user = {
      firstName: 'John',
      email: 'john.doe@abv.bg',
      phoneNumber: '123-123-213',
      password: '123123',
      id: 'asdasdsadsadsa',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}*/
