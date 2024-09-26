import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  loading = true;
  error: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = +(params.get('id') ?? 0); // Use 0 or another invalid ID value as fallback
      if (productId > 0) {
        this.fetchProductDetails(productId);
      } else {
        this.error = 'Invalid product ID';
        this.loading = false;
      }
    });
  }
  
  quantity = 0;

increment(): void {
  this.quantity++;
}

decrement(): void {
  if (this.quantity > 0) {
    this.quantity--;
  }
}


  fetchProductDetails(id: number): void {
    const apiUrl = `https://fakestoreapi.com/products/${id}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.product = data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        this.error = 'Failed to fetch product details. Please try again later.';
        this.loading = false;
      });
  }
}
