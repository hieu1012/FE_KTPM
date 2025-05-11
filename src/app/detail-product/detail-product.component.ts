import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { get } from 'http';
import { getProducts } from 'src/data/product';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-detail-product',
  imports: [FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {

  idProduct: any = 0;
  product: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    this.idProduct = Number(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    this.productService.getProductById(this.idProduct).subscribe({
      next: (response: any) => {
        this.product = response.data;
        // console.log('Sản phẩm:', this.product);
      },
      error: (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    });

  }

}
