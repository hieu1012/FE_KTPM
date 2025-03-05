import { NgClass, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';

@Component({
  selector: 'homeScreen',
  imports: [FormsModule, RouterModule, NgFor, CarouselComponent, CarouselInnerComponent, CarouselItemComponent],
  templateUrl: './homeScreen.component.html',
  styleUrl: './homeScreen.component.css'
})
export class HomeScreen implements OnInit {
  slides = [
    { id: 1, src: 'assets/images/home/banner1.png' },
    { id: 2, src: 'assets/images/home/banner3.png' },
    { id: 3, src: 'assets/images/home/banner2.png' },
  ];

  ngOnInit(): void {
    console.log("ngOnInit() được gọi");
    this.slides = [...this.slides];
    console.log(this.slides);
  }

}
