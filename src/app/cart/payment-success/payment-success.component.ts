import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '@services/paymment.service'; // kiểm tra lại tên file chính xác

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  orderCode: string | null = null;
  status: string | null = null;
  transactionId: string | null = null;

  successMessage: string = '';
  paymentDate: string = new Date().toLocaleDateString('vi-VN');
  paymentMethod: string = 'Chuyển khoản'; // Hoặc giá trị mặc định phù hợp

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.status = params.get('status');
      this.orderCode = params.get('orderCode');
      this.transactionId = params.get('id'); // mã giao dịch PayOS

      if (this.status === 'PAID' && this.orderCode) {
        this.successMessage = 'Giao dịch đã được xử lý thành công.';

        // Gọi API cập nhật trạng thái đơn hàng
        this.paymentService.updateStatusPayment(this.orderCode, this.status).subscribe({
          next: (response) => {
            console.log('Đã cập nhật trạng thái đơn hàng:', response);
          },
          error: (error) => {
            console.error('Lỗi khi cập nhật trạng thái:', error);
          }
        });
      } else {
        this.successMessage = 'Không thể xác minh trạng thái thanh toán.';
      }
    });
  }

  goToOrderDetails(): void {
    // this.router.navigate(['/order-detail', this.orderCode]);
    console.log('Điều hướng đến chi tiết đơn hàng:', this.orderCode);
  }

  goToHomePage(): void {
    // this.router.navigate(['/']);
    console.log('Quay về trang chủ');
  }
}
