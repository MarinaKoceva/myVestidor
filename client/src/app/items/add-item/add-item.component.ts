import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemService } from '../item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  itemId: string | null = null;
  isEditMode: boolean = false;

  selectedFiles: File[] = [];
  previewImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // Check if itemId is present in the route
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.isEditMode = !!this.itemId;

    if (this.isEditMode && this.itemId) {
      // Fetch the item data for editing
      this.itemService.getItemById(this.itemId).subscribe((item) => {
        console.log(item);
        // Populate the form with existing data
      });
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
      this.previewImages = this.selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
    }
  }

  triggerFileInput(): void {
    document.getElementById('photos')?.click();
  }

  addItem(form: NgForm): void {
    if (form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const newItem = {
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      brand: form.value.brand,
      condition: form.value.condition,
      size: form.value.size,
      price: form.value.price,
      img: form.value.img,
    };
  
    console.log('Item to upload:', newItem); // Дали данните са коректни?
  
    this.itemService.addItem(newItem).subscribe({
      next: () => {
        alert('Item uploaded successfully!');
        form.resetForm();
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        console.error('Error uploading item:', err);
        alert('Failed to upload item.');
      },
    });

  }
  
}
