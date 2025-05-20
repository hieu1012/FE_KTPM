import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductService } from '@services/product.service';
import { OrderService } from '@services/order.service';

import { PriceFormatPipe } from '../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-detail-product',
  imports: [FormsModule, CommonModule, PriceFormatPipe],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {

  idProduct: any = 0;
  product: any = null;
  quantity: number = 1;
  user: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private orderService: OrderService) {
    this.idProduct = Number(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {

    // tự động cuộn đến đầu trang khi vào trang chi tiết sản phẩm
    window.scrollTo(0, 0);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.user = parsedUser;
      } catch (error) {
        console.error('Lỗi parse user từ localStorage:', error);
      }
    }

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

  // tăng giảm số lượng sản phẩm
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }



  // Biến để kiểm soát hiển thị thông báo
  showSuccessNotification: boolean = false;
  showErrorNotification: boolean = false;
  showLoading: boolean = false;
  errorMessage: string = '';

  // Phương thức để chuyển tới giỏ hàng
  // Phương thức để chuyển tới giỏ hàng
  goToCart() {
    this.router.navigate(['/Cart']);
  }
  // Phương thức để đóng thông báo
  closeNotification() {
    this.showSuccessNotification = false;
    this.showErrorNotification = false;
  }

  addToCart() {
    if (!this.user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }

    this.showLoading = true; // Hiển thị loading

    // Gọi service để thêm sản phẩm vào giỏ hàng
    this.orderService.addCart(this.quantity, this.idProduct).subscribe({
      next: (response: any) => {
        this.showLoading = false;
        // Hiển thị modal thông báo thành công
        this.showSuccessNotification = true;
      },
      error: (error) => {
        this.showLoading = false;
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        this.errorMessage = 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng';
        this.showErrorNotification = true;
      }
    });
  }
}

