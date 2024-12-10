import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
//import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
}) 

export class LoginComponent {
  domains = ['com', 'bg', 'org', 'net'];

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Please fill in all required fields correctly.');
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
      next: (response) => {
        alert('Login successful!');
        this.router.navigate(['/home']);
        form.resetForm(); // Clear all fields after successful login
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
