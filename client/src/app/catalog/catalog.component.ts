import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrentItemComponent } from '../items/current-item/current-item.component';
import { ItemService } from '../items/item.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  category: string | null = null;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.fetchCatalogItems();
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'];

      this.fetchCatalogItems();
    })
  }

  fetchCatalogItems(): void {
    this.itemService.getItems(this.category).subscribe((items: any[]) => {
      this.catalogItems = items;
    });
  }

  onViewItem(item: any): void {
    console.log('Viewing item:', item);
  }
}