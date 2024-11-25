import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/theme';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent implements OnInit{
  themes: Theme[] =[];
  isLoading = true;
  
  constructor(private apiService: ApiService){

  }

  ngOnInit(){
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }

}
