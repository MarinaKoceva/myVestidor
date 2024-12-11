import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-work',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './how-it-work.component.html',
  styleUrls: ['./how-it-work.component.css'],
})

export class HowItWorkComponent {
  // Getter за проверка на логнатото състояние
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('HowItWorkComponent: User logged in:', this.isLoggedIn);
  }
}
