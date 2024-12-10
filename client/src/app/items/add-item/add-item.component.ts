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
  styleUrls: ['./add-item.component.css'], // Поправено на styleUrls
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
      condition: form.value.Condition, // Трябва да съвпада с името на полето във формата
      size: form.value.size,
      price: form.value.price,
      img: form.value.img, // URL на изображението
    };
  
    console.log('Item to upload:', newItem); // Дали данните са коректни
  

    /*const newItem = {
      ...form.value,
      img: form.value.img || '', // Вземете URL-а за изображението от формата
    };*/
  
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



    /*if (this.isEditMode && this.itemId) {
      // Update existing item
      this.itemService.updateItem(this.itemId, newItem).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    } else {
      // Add new item
      this.itemService.addItem(newItem).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    }*/

      
  }
  
}



/*import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  selectedFiles: File[] = []; // Списък с избрани файлове
  previewImages: string[] = []; // Масив за съхранение на URL адреси за преглед на снимките
  
  // Трик за отваряне на диалог за файлове
  triggerFileInput() {
    const inputElement = document.getElementById('photos') as HTMLInputElement;
    inputElement.click();
  }

  // Събитие при избор на файлове
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);
      this.selectedFiles = files;

      // Генерирайте URL за преглед на всяка снимка
      this.previewImages = files.map(file => URL.createObjectURL(file));
    }
  }
  
  // Дефиниране на категориите
  categories: string[] = ['Women', 'Men', 'Kids', 'Accessories']; // Масив с категориите

  constructor(private apiService: ApiService, private itemService: ItemService, private router: Router) {
    console.log('Categories:', this.categories); // Тест дали категориите са достъпни
  }

  addItem(form: NgForm) {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }
    const { itemName, itemText } = form.value;
    const newItem = {
      name: form.value.title,
      price: form.value.price,
      brand: form.value.brand,
      images: this.selectedFiles.map(file => URL.createObjectURL(file)), // Създаваме URL за всички снимки
      //isNew: true,
    };

    this.itemService.addItem(newItem);
    console.log('New item added:', newItem);

    // Нулиране на формата
    form.reset();
    this.selectedFiles = [];
    this.previewImages = []; // Изчистване предварителните прегледи
    this.router.navigate(['/catalog']);
    // Извикване на API за създаване на нов елемент
     // Изпращане данните към бекенда чрез ApiService
    this.apiService.createItem(itemName, itemText).subscribe({
    next: (response) => {
      console.log('Item created successfully:', response);
      alert('Item created successfully!');
    },
    error: (err) => {
      console.error('Error creating item:', err);
      alert('Error occurred while creating the item.');
    },
  });
  }
}*/


/*import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  constructor(private apiService: ApiService) {}

  addItem(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      return;
    }

    console.log(form.value);

    // this.apiService.createItem(itemName, postText).subscribe((data) => {
    //   console.log(data);
    // });
  }
}*/