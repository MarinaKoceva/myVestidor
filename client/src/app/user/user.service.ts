import { Injectable, OnDestroy } from '@angular/core';
import { ProfileDetails, UserForAuth } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
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
        this.user$$.next(user);
        console.log(user.items);
        
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
      .pipe(tap((user) => {
        this.user$$.next(user);
        localStorage.setItem('accessToken', user.accessToken);
      }));
  }


  logout() {
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
  }

  getProfile(userId: String) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': localStorage.getItem('accessToken')!,
      'Content-Type': 'application/json',
    });
    
    return this.http
      .get<UserForAuth>(`${environment.apiUrl}/profile/${userId}`, {headers: httpHeaders})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, userId: string) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-Authorization': localStorage.getItem('accessToken')!,
      'Content-Type': 'application/json',
    });
    
    return this.http
      .put<UserForAuth>(`${environment.apiUrl}/profile/${userId}`, {
        username,
        email,//tel
      }, {headers: httpHeaders})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getUserDetails(userId: string): Observable<ProfileDetails> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.get<ProfileDetails>(url);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
