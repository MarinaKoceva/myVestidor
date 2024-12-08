import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CurrentItemComponent } from './items/current-item/current-item.component';
import { AddItemComponent } from './items/add-item/add-item.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'how-it-works', component: HowItWorkComponent },
  { path: 'catalog', component: CatalogComponent },

  // Items routing
  {
    path: 'items',
    children: [
      { path: '', component: MainComponent },
      {
        path: ':itemId',
        component: CurrentItemComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'add-item', component: AddItemComponent, canActivate: [AuthGuard] }, // For creating items
  { path: 'edit-item/:itemId', component: AddItemComponent, canActivate: [AuthGuard] }, // For editing items
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
