import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../../types/item';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  @ViewChild('editForm') form!: NgForm; // Access the form
  item: Item | null = null;
  private itemId: string | null = null;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('itemId');

      if (this.itemId) {
        this.loadItemDetails(this.itemId);
      } else {
        console.error('Item ID not found in route parameters.');
        this.router.navigate(['/404']);
      }
    });
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
          img: item.img || './placeholder.png',
        };

        // Set form values if the form is initialized
        if (this.form) {
          this.form.setValue({
            title: this.item.title,
            description: this.item.description,
            category: this.item.category,
            brand: this.item.brand,
            condition: this.item.condition,
            size: this.item.size,
            price: this.item.price,
            img: this.item.img,
          });
        }
      },
      error: (error) => {
        console.error('Error loading item details:', error);
        this.router.navigate(['/404']);
      },
    });
  }

  editItem(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid form data');
      return;
    }

    const updatedItem = {
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      brand: form.value.brand,
      condition: form.value.condition,
      size: form.value.size,
      price: form.value.price,
      img: form.value.img,
    };

    this.itemService.updateItem(this.itemId!, updatedItem)
    .subscribe({
      next: () => {
        this.router.navigate(['items', this.itemId]);
      },
      error: (err) => {
        console.error('Edit error:', err);
        alert('Failed to login. Please check your credentials.');
      },
    });
  }
}
