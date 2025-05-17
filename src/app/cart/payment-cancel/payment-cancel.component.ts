import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements OnInit {
  errorCode: string = 'ERR-' + Math.floor(1000 + Math.random() * 9000);
  errorMessage: string = 'Giao dịch bị từ chối bởi ngân hàng phát hành';
  attemptDate: string = new Date().toLocaleDateString('vi-VN');

  constructor() { }

  ngOnInit(): void {
    // Có thể nhận dữ liệu từ service hoặc route params ở đây
  }

  tryAgain(): void {
    // Chuyển hướng trở lại trang thanh toán
    console.log('Thử lại thanh toán');
  }

  contactSupport(): void {
    // Chuyển hướng đến trang liên hệ hỗ trợ
    console.log('Liên hệ hỗ trợ');
  }

  goToHomePage(): void {
    // Chuyển hướng về trang chủ
    console.log('Điều hướng về trang chủ');
  }
}