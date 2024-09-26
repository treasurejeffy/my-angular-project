import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of, pipe } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
  allproducts:{id:number, title:string, price:string, category:string, description: string, image:string}[]=[];
  isLoading: boolean = true; // Loader state
  errorMessage: string = ''; 
  selectedProduct: any | null = null;

  constructor (private Http: HttpClient, private router: Router){};

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.Http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe(
        (products: any[]) => {
          this.allproducts = products;
          this.isLoading = false; // Hide loader after data is fetched
        },
        (error) => {
          console.error('Error fetching products', error);
          this.errorMessage = 'Error fetching products. Please try again later.';
          this.isLoading = false; // Hide loader even if there is an error
        }
      );
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }

  showAddToCart(product: any): void {
    this.selectedProduct = product;
  }

  addToCart(product: any): void {
    console.log('Added to cart:', product);
    // Add logic to handle adding product to cart
  }

}