import { Component } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Поправихме на styleUrls
})
export class ProfileComponent {
  isEditMode: boolean = false;

  // Потребителски данни
  profileDetails: ProfileDetails = {
    username: 'JohnDoe',
    email: 'johndoe123@gmail.com',
    tel: '123-123-213',
  };

  // Данни за обявите
  userAds = [
    {
      id: 1,
      title: 'Ad Title 1',
      description: 'Description for Ad 1.',
      imageUrl: './ad1.jpg',
    },
    {
      id: 2,
      title: 'Ad Title 2',
      description: 'Description for Ad 2.',
      imageUrl: './ad2.jpg',
    },
    {
      id: 3,
      title: 'Ad Title 3',
      description: 'Description for Ad 3.',
      imageUrl: './ad3.jpg',
    },
  ];
  
  // Форма за редакция
  form = new FormGroup({
    username: new FormControl(this.profileDetails.username, [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl(this.profileDetails.email, [
      Validators.required,
      Validators.email,
    ]),
    tel: new FormControl(this.profileDetails.tel),
  });

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.form.setValue({
        username: this.profileDetails.username,
        email: this.profileDetails.email,
        tel: this.profileDetails.tel,
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

  editAd(ad: any) {
    console.log('Editing ad:', ad);
  }

  deleteAd(ad: any) {
    console.log('Deleting ad:', ad);
    this.userAds = this.userAds.filter((item) => item.id !== ad.id);
  }
}
