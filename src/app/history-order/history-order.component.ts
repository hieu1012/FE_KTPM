import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { PriceFormatPipe } from '../shared/pipes/price-format.pipe';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImage: string | null;
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  status: string;
  totalAmount: number;
  taxAmount: number;
  finalAmount: number;
  shippingAddress: string | null;
  paymentMethod: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

@Component({
  selector: 'app-history-order',
  standalone: true,
  imports: [CommonModule, RouterModule, PriceFormatPipe],
  templateUrl: './history-order.component.html',
  styleUrl: './history-order.component.css'
})
export class HistoryOrderComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';

  // Status labels and colors
  statusMap: { [key: string]: { label: string, color: string } } = {
    'PENDING': { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-800' },
    'PROCESSING': { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800' },
    'SHIPPED': { label: 'Đang giao hàng', color: 'bg-indigo-100 text-indigo-800' },
    'DELIVERED': { label: 'Đã giao hàng', color: 'bg-green-100 text-green-800' },
    'PAID': { label: 'Đã thanh toán', color: 'bg-green-100 text-green-800' },
    'CANCELLED': { label: 'Đã hủy', color: 'bg-red-100 text-red-800' }
  };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;

    this.orderService.getAllOrders().subscribe({
      next: (response: any) => {
        console.log('Lịch sử đơn hàng:', response);
        if (response.success && response.data) {
          this.orders = response.data.content;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
        this.error = 'Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.';
        this.loading = false;
      }
    });
  }

  // Format date string to readable format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get status label and color
  getStatusInfo(status: string): { label: string, color: string } {
    return this.statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  }

  // Calculate total number of items in an order
  getTotalItems(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Cancel order
  cancelOrder(orderId: number): void {
    console.log('Hủy đơn hàng với ID:', orderId);
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: (response) => {
          console.log('Đơn hàng đã được hủy:', response);
          this.loadOrders(); // Reload orders after cancellation
        },
        error: (error) => {
          console.error('Lỗi khi hủy đơn hàng:', error);
          alert('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
        }
      });
    }
  }
}