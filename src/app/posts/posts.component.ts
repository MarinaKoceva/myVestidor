import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'], // забележете, че името трябва да е styleUrls, а не styleUrl
})
export class PostComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(posts => {
      console.log(posts);
    });
  }
}


/*import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostComponent implements OnInit {
  constructor(private apiService: ApiService){

    ngOnInit(): void {
      this.apiService.getPosts().subscribe(p => {
        console.log(p);
      });
    }
  }
}*/



/*export class PostComponent implements OnInit {
  constructor(private apiService: ApiService) {

    ngOnInit(): void {
      this.apiService.getPosts().subscribe(p => {
        console.log(p);
      })
    }
  }
}*/
