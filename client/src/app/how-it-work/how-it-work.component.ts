import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-how-it-work',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './how-it-work.component.html',
  styleUrl: './how-it-work.component.css'
})
export class HowItWorkComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
