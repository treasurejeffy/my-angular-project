import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesWithImages: { name: string, imageUrl: string }[] = [];
  isLoading: boolean = true; // Loader state
  errorMessage: string = ''; // Error message

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.http.get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error fetching categories. Please try again later.';
          console.error('Error fetching categories', error);
          return of([]); // Return an empty array on error
        })
      )
      .subscribe(
        (categories: string[]) => {
          this.categoriesWithImages = categories.map(category => {
            let imageUrl = '';
            switch (category) {
              case 'electronics':
                imageUrl = 'assets/Electronic.jpeg';
                break;
              case 'jewelery':
                imageUrl = 'assets/jewellery.jpeg';
                break;
              case "men's clothing":
                imageUrl = 'assets/men.jpeg';
                break;
              case "women's clothing":
                imageUrl = 'assets/women.jpeg';
                break;
              default:
                imageUrl = 'assets/images/default.jpg';
            }
            return { name: category, imageUrl: imageUrl };
          });
          this.isLoading = false; // Hide loader after data is fetched
        }
      );
  }
}
