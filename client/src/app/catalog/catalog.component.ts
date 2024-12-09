import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrentItemComponent } from '../items/current-item/current-item.component';
import { ItemService } from '../items/item.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  //selectedItem: any;
  /*catalogItems = [
    { id: 1, name: 'Item 1', price: 15, image: './item1.png', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', price: 10, image: './item2.png', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', price: 20, image: './item3.png', description: 'Description of Item 3' }
  ];*/

  catalogItems: any[] = [];


  constructor(private itemService: ItemService ,private router: Router) {}
  
  ngOnInit(): void {
    this.fetchCatalogItems();
  }

  fetchCatalogItems(): void {
    this.itemService.getItems().subscribe((items: any[]) => {
      this.catalogItems = items;
    });
  }

  onViewItem(item: any): void {
    console.log('Viewing item:', item);
  }
}
  
  /*ngOnInit() {
    this.itemService.getAll().subscribe((items) => {
      console.log(items);
      
      
    });
  }*/
  
  /*onViewItem(item: any) {
    if (!item.id) {
      console.error('Item ID is missing:', item);
      return;
    }
    console.log('Navigating to item details:', item);
    this.router.navigate(['/items', item.id]); // Навигира към правилния маршрут
  }*/
  

  /*viewItem(item: any) {
    this.router.navigate(['/item', item.id]); // Навигира към детайлите на артикула
  }*/


