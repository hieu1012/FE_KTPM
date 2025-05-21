import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '@services/paymment.service';

@Component({
  selector: 'app-payment-failure',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent implements OnInit {
  errorCode: string = '';
  errorMessage: string = '';
  attemptDate: string = new Date().toLocaleDateString('vi-VN');
  status: string | null = null;
  orderCode: string | null = null;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.status = params.get('status');
      this.orderCode = params.get('orderCode');

      // Tạo mã lỗi nếu không có trong URL
      this.errorCode = 'ERR-' + Math.floor(1000 + Math.random() * 9000);

      // Tùy chỉnh thông báo lỗi theo trạng thái
      if (this.status === 'CANCELLED') {
        this.errorMessage = 'Giao dịch đã bị hủy bởi người dùng hoặc ngân hàng.';
      } else {
        this.errorMessage = 'Không thể hoàn tất giao dịch. Vui lòng thử lại.';
      }

      console.log(this.status);
      console.log(this.orderCode);
    });

    this.paymentService.getStatusPayment(this.orderCode).subscribe({
      next: (response) => {
        console.log('Trạng thái: ', response);
      },
      error: (error) => {
        console.error('Error details:', error);
      }
    });
  }

  tryAgain(): void {
    // Gọi lại API hoặc chuyển hướng trang thanh toán lại
    console.log('Thử lại thanh toán');
  }

  contactSupport(): void {
    // Điều hướng đến trang liên hệ
    console.log('Liên hệ hỗ trợ');
  }

  goToHomePage(): void {
    // Về trang chủ
    console.log('Điều hướng về trang chủ');
  }
}
