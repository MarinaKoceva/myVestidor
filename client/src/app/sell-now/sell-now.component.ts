import { Component } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sell-now.component.html',
  styleUrls: ['./sell-now.component.css'],
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
}




/*import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sell-now',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sell-now.component.html',
  styleUrl: './sell-now.component.css'
})
export class SellNowComponent {
  constructor(private apiService: ApiService) {}

  addTheme(form:NgForm) {
    console.log(form);

    if (form.invalid) {
      return;
    }

    console.log(form.value);

    // this.apiService.createTheme(themeName, postText).subscribe((data) => {
    //   console.log(data);
    // });
  }
}*/