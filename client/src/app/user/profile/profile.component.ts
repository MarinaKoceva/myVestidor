import { Component } from '@angular/core';
import { Item } from '../../types/item';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { ItemService } from '../../items/item.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isEditMode: boolean = false;
  userId: string | null = null;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)])

  });

  constructor(private userService: UserService, private router: Router, private itemService: ItemService) { }

  // Потребителски данни
  updateProfile() {
    const { username, email } = this.form.value;

    this.userService.updateProfile(username!, email!, this.userService.user?._id!).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.isEditMode = false; // Излизаме от режим на редактиране
        this.router.navigate(['/profile']); // Пренасочваме към профила
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  profileDetails: ProfileDetails = {
    _id: '',
    username: '',
    email: '',
    items: []
  };

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userId = this.userService.user?._id!;

    if (!this.userId) {
      console.error('No user logged in!');
      return;
    }

    this.userService.getProfile(this.userId).subscribe({
      next: (profile) => {
        this.profileDetails = profile;
        console.log('User profile loaded:', profile);
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.form.setValue({
        username: this.profileDetails.username,
        email: this.profileDetails.email,
      });
    }
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as any;
    this.isEditMode = false;
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.isEditMode = false;
  }

  deleteItem(itemId: string) {

    this.itemService.deleteItem(itemId).subscribe({
      next: (response) => {
        this.router.navigate(['catalog']);
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }
}