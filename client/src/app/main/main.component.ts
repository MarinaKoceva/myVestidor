import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ThemesComponent } from './themes/themes.component';
import { PostComponent } from './posts/posts.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent, ThemesComponent, PostComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
