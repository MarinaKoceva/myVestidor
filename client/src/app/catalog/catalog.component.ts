import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  catalogItems = [
    {
      name: 'Item 1',
      price: 50,
      image: 'assets/images/item1.jpg',
      isNew: true
    },
    {
      name: 'Item 2',
      price: 70,
      image: 'assets/images/item2.jpg',
      isNew: false
    },
    {
      name: 'Item 3',
      price: 30,
      image: 'assets/images/item3.jpg',
      isNew: true
    }
  ];
}
