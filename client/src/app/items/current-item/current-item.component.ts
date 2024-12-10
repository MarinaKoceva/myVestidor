import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemService } from '../item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.css']
})
export class CurrentItemComponent implements OnInit {
  item: any = null; // Данни за текущия елемент
  itemId: string | null = null; // ID на елемента от URL
  isLoggedIn: boolean = false; // Проверка за логнат потребител
  isOwner: boolean = false; // Проверка дали потребителят е собственик
  loading: boolean = true; // Показване на индикатор за зареждане
  errorMessage: string | null = null; // Грешка, ако има проблем

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // Извличане на ID на елемента от URL
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.loadItemDetails(this.itemId);
      } else {
        this.loading = false;
        this.errorMessage = 'Invalid item ID';
      }
    });

    // логика за проверка на логин
    this.isLoggedIn = true;
  }

  loadItemDetails(id: string): void {
    this.itemService.getItemById(id).subscribe({
      next: (item: any) => {
        this.item = {
          id: item._id,
          title: item.title,
          description: item.description,
          category: item.category,
          brand: item.brand,
          condition: item.condition,
          size: item.size,
          price: Number(item.price), // Преобразуване към число
          img: item.img || './placeholder.png', // Добавяне на placeholder
        };

        // Проверка дали потребителят е собственик
        this.isOwner = this.checkIfOwner(item._ownerId);
      },
      error: (error) => {
        console.error('Error loading item details:', error);
        this.router.navigate(['/404']); // Пренасочване към страница за грешка
      }
    });
  }

  checkIfOwner(ownerId: string): boolean {
    const currentUserId = '6755cdf8a1b07692e85b64b3'; // Заменете с текущия user ID от AuthService
    return ownerId === currentUserId;
  }

  goBackToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  editItem(): void {
    if (this.itemId) {
      this.router.navigate(['/edit-item', this.itemId]);
    }
  }

  deleteItem(): void {
    if (this.itemId) {
      this.itemService.deleteItem(this.itemId).subscribe({
        next: () => {
          alert('Item deleted successfully!');
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error('Error deleting item:', err);
        }
      });
    }
  }
}


/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-current-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.css']
})
export class CurrentItemComponent implements OnInit {
  item: any;
  itemId: string | null = null;
  isLoggedIn = false; // This should be set based on your auth service
  isOwner = false; // This should be set based on item ownership
  loading: boolean = true; 
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  item$: Observable<any> | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.loadItemDetails(this.itemId);
      }
    });

    // Example authentication logic
    this.isLoggedIn = true; // Replace with actual authentication service
    this.isOwner = true; // Replace with logic to check item ownership
  }

  
  /*loadItemDetails(id: string): void {
    this.item$ = this.itemService.getItemById(id);
  }*/
  /*loadItemDetails(id: string): void {
    this.itemService.getItemById(id).subscribe(
      (item) => {
        this.item = item;
      },
      (error) => {
        console.error('Error loading item:', error);
        this.router.navigate(['/404']);
      }
    );
  }

  goBackToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  editItem(): void {
    this.router.navigate(['/edit-item', this.itemId]);
  }

  deleteItem(): void {
    if (this.itemId) { // Проверка дали itemId не е null
      this.itemService.deleteItem(this.itemId).subscribe(
        () => {
          this.router.navigate(['/catalog']);
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    } else {
      console.error('Item ID is null or undefined.');
    }
  }
}
*/



/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-current-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.css']
})
export class CurrentItemComponent implements OnInit {
  itemId: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');

    if (!this.itemId) {
      // Показва съобщение за грешка, ако ID-то липсва
      this.errorMessage = 'Invalid item ID. Please return to the catalog.';
      console.error(this.errorMessage);
    } else {
      console.log('Loaded item ID:', this.itemId);
    }
  }

  goBackToCatalog() {
    this.router.navigate(['/catalog']); // Пренасочване обратно към каталога
  }
}*/



/*import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-current-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-item.component.html',
  styleUrl: './current-item.component.css'
})
export class CurrentItemComponent implements OnInit{
  item: any; // Артикул, който ще се визуализира
  
  catalogItems = [
    { id: 1, name: 'Item 1', price: 15, image: './item1.png', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', price: 10, image: './item2.png', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', price: 20, image: './item3.png', description: 'Description of Item 3' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.catalogItems.find(item => item.id === itemId);
  }
}*/
