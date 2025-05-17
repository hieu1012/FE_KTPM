import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  orderNumber: string = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  paymentDate: string = new Date().toLocaleDateString('vi-VN');
  amount: string = '2.350.000 VNĐ';
  paymentMethod: string = 'Thẻ tín dụng';

  constructor() { }

  ngOnInit(): void {
    // Có thể nhận dữ liệu từ service hoặc route params ở đây
  }

  goToOrderDetails(): void {
    // Chuyển hướng tới trang chi tiết đơn hàng
    console.log('Điều hướng đến trang chi tiết đơn hàng');
  }

  goToHomePage(): void {
    // Chuyển hướng về trang chủ
    console.log('Điều hướng về trang chủ');
  }
}