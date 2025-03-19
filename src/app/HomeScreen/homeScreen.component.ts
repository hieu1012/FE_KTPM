import { NgClass, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; // để sử dụng slice 




@Component({
  selector: 'homeScreen',
  imports: [FormsModule, RouterModule, NgFor, CarouselModule, CommonModule],
  // imports: [FormsModule, RouterModule, NgFor],
  templateUrl: './homeScreen.component.html',
  styleUrl: './homeScreen.component.css'
})
export class HomeScreen implements OnInit {
  slides = [
    { id: 1, src: 'assets/images/home/banner1.png' },
    { id: 2, src: 'assets/images/home/banner3.png' },
    { id: 3, src: 'assets/images/home/banner2.png' },
    { id: 4, src: 'assets/images/home/banner1.png' },
    { id: 5, src: 'assets/images/home/banner1.png' },
  ];

  products = [
    {
      id: 1,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      price: '$4.99',
      img: 'assets/images/products/sp1.png'
    },
    {
      id: 2,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      price: '$499.00',
      img: 'assets/images/products/sp1.png'
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      price: '$4.99',
      img: 'assets/images/products/sp1.png'
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      price: '$4.99',
      img: 'assets/images/products/sp1.png'
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      price: '$4.99',
      img: 'assets/images/products/sp1.png'
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-Onsfsdfdfdz.',
      price: '$4.99',
      img: 'assets/images/products/sp1.png'
    },
  ]

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



  ngOnInit(): void {
    console.log("ngOnInit() được gọi");
    this.itemBanner = [...this.slides];
  }


}
