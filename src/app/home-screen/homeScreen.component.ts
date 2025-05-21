import { NgClass, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; // để sử dụng slice 
import { getProducts } from 'src/data/product';
import { ROUTING } from 'src/constants/routing';
import { ProductService } from '@services/product.service';
import { PriceFormatPipe } from '../shared/pipes/price-format.pipe';




@Component({
  selector: 'homeScreen',
  imports: [FormsModule, RouterModule, NgFor, CarouselModule, CommonModule, PriceFormatPipe],
  // imports: [FormsModule, RouterModule, NgFor],
  templateUrl: './homeScreen.component.html',
  styleUrl: './homeScreen.component.css'
})
export class HomeScreen implements OnInit {
  ROUTING = ROUTING;

  constructor(private productService: ProductService) { }
  listProducts: any[] = [];


  slides = [
    { id: 1, src: 'assets/images/home/banner1.png' },
    { id: 2, src: 'assets/images/home/banner3.png' },
    { id: 3, src: 'assets/images/home/banner2.png' },
    { id: 4, src: 'assets/images/home/banner1.png' },
    { id: 5, src: 'assets/images/home/banner1.png' },
  ];

  itemBanner: any[] = [];

  customOptions: OwlOptions = {
    loop: true, // Cho phép lặp lại carousel
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1 // Hiển thị 1 ảnh trên màn hình nhỏ
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
  };

  products = getProducts();

  ngOnInit(): void {
    this.itemBanner = [...this.slides];
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.listProducts = response;
        console.log('Danh sách sản phẩm:', this.listProducts);
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    });
  }


}
