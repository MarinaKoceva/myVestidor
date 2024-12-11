import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-current-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    private itemService: ItemService,
    private userService: UserService
  ) { }

 
  ngOnInit(): void {
    // Извличане на ID на елемента от URL
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('itemId');


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
          price: Number(item.price), 
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
    const currentUserId = this.userService.user?._id;
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

  buyNow() {
    this.itemService.buyItem(this.item).catch((err) => console.error(err));
  }
}
