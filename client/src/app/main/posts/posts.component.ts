import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/post';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'], 
})
export class PostComponent implements OnInit {
  posts: Post[] = []; 
  isLoading = true;
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts(10).subscribe(posts => { //limit 10 posts
      console.log(posts);
      this.posts = posts;
      this.isLoading = false;
    });
  }
}
