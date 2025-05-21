import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { PaymentService } from '../shared/services/paymment.service';
import { OrderService } from '../shared/services/order.service';

import { PriceFormatPipe } from '../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, KENDO_GRID, GridModule, NzButtonModule, NzIconModule, PriceFormatPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  // Thông tin giỏ hàng
  listCart: any[] = [];

  // Thông tin người dùng
  user: any = null;

  // Thông tin thanh toán
  shippingCost: number = 21000; // 21,000 VND
  taxRate: number = 0.1; // 10%

  // Thông tin trạng thái
  isLoading: boolean = true;
  errorMessage: string = '';

  // Địa chỉ giao hàng
  shippingAddress = {
    fullName: '',
    phone: '',
    address: '',
  };

  constructor(
    private paymentService: PaymentService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    if (this.user) {
      this.loadCartItems();
    } else {
      this.isLoading = false;
      this.errorMessage = 'Vui lòng đăng nhập để xem giỏ hàng';
    }
  }


  loadUserData(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.shippingAddress = {
          fullName: this.user.fullName || '',
          phone: this.user.email || '',
          address: 'Thành phố Hồ Chí Minh',
        };
      } catch (error) {
        console.error('Lỗi parse user từ localStorage:', error);
        this.errorMessage = 'Không thể đọc thông tin người dùng';
      }
    }
  }

  loadCartItems(): void {
    this.isLoading = true;
    this.orderService.getCartAllByUserId(this.user.id).subscribe({
      next: (response: any) => {
        if (response && response.data && response.data.items) {
          this.listCart = response.data.items;
          console.log('Giỏ hàng:', this.listCart);
        } else {
          this.listCart = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        this.errorMessage = 'Không thể tải giỏ hàng. Vui lòng thử lại sau.';
        this.isLoading = false;
      }
    });
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity < 1) return;

    // Lưu giá trị cũ để khôi phục nếu cập nhật thất bại
    const oldQuantity = item.quantity;
    item.quantity = newQuantity; // Cập nhật UI ngay lập tức

    this.orderService.updateCartItem(item.productId, newQuantity).subscribe({
      next: () => {
        console.log('Cập nhật số lượng thành công');
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật số lượng:', error);
        // Khôi phục giá trị cũ nếu cập nhật thất bại
        item.quantity = oldQuantity;
        alert('Không thể cập nhật số lượng. Vui lòng thử lại sau.');
      }
    });
  }

  removeItem(itemId: number): void {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.isLoading = true;
      console.log('Đang xóa sản phẩm có ID:', itemId);
      console.log('Danh sách trước khi xóa:', this.listCart);

      this.orderService.removeCartItem(itemId).subscribe({
        next: () => {
          console.log('Xóa thành công sản phẩm có ID:', itemId);

          // Lưu số lượng sản phẩm trước khi xóa để kiểm tra
          const beforeCount = this.listCart.length;

          // Lọc danh sách và gán lại vào biến mới để đảm bảo tham chiếu thay đổi
          const updatedCart = this.listCart.filter(item => {
            const keep = item.productId !== itemId;
            if (!keep) {
              console.log('Loại bỏ sản phẩm:', item);
            }
            return keep;
          });

          // Gán lại vào listCart một mảng mới
          this.listCart = [...updatedCart];

          console.log('Danh sách sau khi xóa:', this.listCart);
          console.log('Đã xóa ' + (beforeCount - this.listCart.length) + ' sản phẩm');

          // Đảm bảo loading được tắt
          this.isLoading = false;

          // Nếu không có sự thay đổi số lượng, có thể ID không khớp
          if (beforeCount === this.listCart.length) {
            console.warn('Không tìm thấy sản phẩm cần xóa trong listCart. ID không khớp!');
            console.log('ID muốn xóa:', itemId);
            console.log('Các ID hiện có:', this.listCart.map(i => ({ id: i.id, productId: i.productId })));

            // Tải lại danh sách từ server để đồng bộ
            this.loadCartItems();
          }
        },
        error: (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          this.isLoading = false;
          alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
        }
      });
    }
  }

  // Tính toán giá trị đơn hàng
  calculateCartSubtotal(): number {
    return this.listCart.reduce((total, item) =>
      total + (item.price * item.quantity), 0);
  }

  calculateTax(): number {
    return this.calculateCartSubtotal() * this.taxRate;
  }

  calculateTotal(): number {
    return this.calculateCartSubtotal() + this.shippingCost + this.calculateTax();
  }

  // Xử lý thanh toán
  // Xử lý thanh toán
  handlePayment(): void {
    // Thông tin chuyển khoản
    const transferInfo = {
      orderId: 0,
      amount: 0
    };

    if (this.listCart.length === 0) {
      alert('Giỏ hàng của bạn đang trống.');
      return;
    }

    // Kiểm tra thông tin địa chỉ
    if (!this.validateShippingAddress()) {
      alert('Vui lòng nhập đầy đủ thông tin địa chỉ giao hàng.');
      return;
    }

    // Hiển thị loading
    this.isLoading = true;

    // gọi API tạo đơn hàng
    this.orderService.createOrder(
      this.shippingAddress.address,
      'payos',
      this.calculateTax() + this.shippingCost
    ).subscribe({
      next: (response) => {
        transferInfo.orderId = response.data.id;
        transferInfo.amount = response.data.finalAmount;
        console.log("Thông tin truyền đi", transferInfo);

        // Chỉ gọi API thanh toán SAU KHI đã nhận được response từ API tạo đơn hàng
        this.paymentService.paymentWithPayos(
          transferInfo.orderId,
          transferInfo.amount
        ).subscribe({
          next: (response) => {
            console.log('API Payment response:', response);
            // Xử lý tiếp
            if (response && response.checkoutUrl) {
              window.location.href = response.checkoutUrl;
            } else {
              console.error('Missing checkoutUrl in response:', response);
              this.isLoading = false;
            }
          },
          error: (error) => {
            console.error('Payment API error:', error);
            this.isLoading = false;
            alert('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại sau.');
          }
        });
      },
      error: (error) => {
        console.error('Lỗi khi tạo đơn hàng:', error);
        this.isLoading = false;
        alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
      }
    });
  }

  // Kiểm tra thông tin địa chỉ
  validateShippingAddress(): boolean {
    return !!(
      this.shippingAddress.fullName &&
      this.shippingAddress.phone &&
      this.shippingAddress.address
    );
  }
}