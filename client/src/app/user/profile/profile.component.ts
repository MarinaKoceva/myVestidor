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
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isEditMode: boolean = false;
  items: Item[] =[];

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)])

  });

  constructor(private userService: UserService, private router: Router) { }

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


  /*updateProfile() {
    
    const {
      username,
      email,
    } = this.form.value;

    this.userService
      .updateProfile(username!, email!, this.userService.user?._id!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error with registration:', err);
          alert('Registration failed.');
        },
      })
  }  */

  profileDetails: ProfileDetails = {
    _id: '',
    username: '',
    email: '',
  };

  ngOnInit(): void {
    this.loadUserProfile();
    this.items = this.userService.user?.items!;
  }

  loadUserProfile(): void {
    const userId = this.userService.user?._id;

    if (!userId) {
      console.error('No user logged in!');
      return;
    }

    this.userService.getProfile(userId).subscribe({
      next: (profile) => {
        this.profileDetails = profile;
        console.log('User profile loaded:', profile);
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }

  // get items : any[] () {
  //   return this.userService?.user.items;
  // }
  // Данни за обявите

  // userAds = [
  //   {
  //     id: 1,
  //     title: 'Ad Title 1',
  //     description: 'Description for Ad 1.',
  //     imageUrl: './item1.png',
  //   },
  //   {
  //     id: 2,
  //     title: 'Ad Title 2',
  //     description: 'Description for Ad 2.',
  //     imageUrl: '/item2.png',
  //   },
  //   {
  //     id: 3,
  //     title: 'Ad Title 3',
  //     description: 'Description for Ad 3.',
  //     imageUrl: './item3.png',
  //   },
  // ];

  // Форма за редакция
  /*form = new FormGroup({
    username: new FormControl(this.profileDetails.username, [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl(this.profileDetails.email, [
      Validators.required,
      Validators.email,
    ]),
    tel: new FormControl(this.profileDetails.tel),
  });*/

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

  editAd(ad: any) {
    console.log('Editing ad:', ad);
  }

  // deleteAd(ad: any) {
  //   console.log('Deleting ad:', ad);
  //   this.userAds = this.userAds.filter((item) => item.id !== ad.id);
  // }
}
