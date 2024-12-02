import { Component } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
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
}
