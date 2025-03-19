import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'about',
  imports: [NgIf, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutUs = [
    {
      id: 1,
      title: 'A Family That Keeps On Growing',
      description: 'We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store. ',
      shopImagePath: 'assets/images/about/1.png'
    },
    {
      id: 2,
      title: 'Shop.com',
      description: 'Shop.com is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating since 1991. Our client base encompasses individuals, small business, corporate and government organisations. We provide complete business IT solutions, centred on high quality hardware and exceptional customer service.',
      shopImagePath: 'assets/images/about/2.png'
    },
    {
      id: 3,
      title: `Now You're In Safe Hands`,
      description: 'Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.',
      shopImagePath: 'assets/images/about/3.png'
    },
    {
      id: 4,
      title: 'The Highest Quality of Products',
      description: 'We guarantee the highest quality of the products we sell. Several decades of successful operation and millions of happy customers let us feel certain about that. Besides, all items we sell pass thorough quality control, so no characteristics mismatch can escape the eye of our professionals.',
      shopImagePath: 'assets/images/about/4.png'
    },

  ]
}
