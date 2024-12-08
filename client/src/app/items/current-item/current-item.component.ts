import { CommonModule } from '@angular/common';
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
}



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
