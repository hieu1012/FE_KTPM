import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { isVisible } from '@progress/kendo-angular-common';

import { PaymentService } from '@services/paymment.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, KENDO_GRID, GridModule, NzButtonModule, NzIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [
    {
      id: 1,
      name: 'MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty',
      price: 5000.000,
      quantity: 1,
      imageUrl: 'https://thanhnien.mediacdn.vn/Uploaded/baont/2022_01_06/acer-ces-2022-1-7222.png',
      specs: 'Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty'
    },
    {
      id: 2,
      name: 'MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty',
      price: 200000,
      quantity: 1,
      imageUrl: 'https://thanhnien.mediacdn.vn/Uploaded/baont/2022_01_06/acer-ces-2022-1-7222.png',
      specs: 'Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty'
    },
    {
      id: 1,
      name: 'MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty',
      price: 100000,
      quantity: 1,
      imageUrl: 'https://thanhnien.mediacdn.vn/Uploaded/baont/2022_01_06/acer-ces-2022-1-7222.png',
      specs: 'Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty'
    },
    {
      id: 2,
      name: 'MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty',
      price: 200000,
      quantity: 1,
      imageUrl: 'https://thanhnien.mediacdn.vn/Uploaded/baont/2022_01_06/acer-ces-2022-1-7222.png',
      specs: 'Intel i7 10700K, 2070 SUPER, 32GB RAM 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty'
    },


  ];


  constructor(private paymentService: PaymentService) { }


  shippingCost: number = 21.00;
  taxRate: number = 0.1;
  discountExpanded: boolean = false;
  shippingExpanded: boolean = false;


  ngOnInit(): void { }

  calculateSubtotal(item: any): number {
    return item.price * item.quantity;
  }

  calculateCartSubtotal(): number {
    return this.cartItems.reduce((total, item) =>
      total + this.calculateSubtotal(item), 0);
  }

  calculateTax(): number {
    return this.calculateCartSubtotal() * this.taxRate;
  }

  calculateTotal(): number {
    return this.calculateCartSubtotal() + this.shippingCost + this.calculateTax();
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity >= 1) {
      item.quantity = newQuantity;
    }
  }

  // Kiểm tra chọn tất cả
  isAllSelected(): boolean {
    if (this.cartItems.length === 0) {
      return false;
    }

    return this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
  }

  // Toggle tất cả
  toggleSelectAll(event: any): void {

    const checked = event.target.checked;
    this.cartItems.forEach(item => item.selected = checked);
  }

  // Xóa những item được chọn
  removeSelectedItems(): void {
    this.cartItems = this.cartItems.filter(item => !item.selected);
  }

  // Kiểm tra xem có sản phẩm nào được chọn không
  hasSelectedItems(): boolean {
    return this.cartItems.some(item => item.selected);
  }

  toggleDiscountExpanded(): void {
    this.discountExpanded = !this.discountExpanded;
  }

  toggleShippingExpanded(): void {
    this.shippingExpanded = !this.shippingExpanded;
  }

  // Tính tổng tiền cho các sản phẩm được chọn
  calculateSelectedSubtotal(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Tính thuế cho các sản phẩm được chọn
  calculateSelectedTax(): number {
    return this.calculateSelectedSubtotal() * this.taxRate;
  }

  // Tính tổng cộng cho các sản phẩm được chọn
  calculateSelectedTotal(): number {
    return this.calculateSelectedSubtotal() + this.shippingCost + this.calculateSelectedTax();
  }


  // Hàm xử lý khi nhấn nút thanh toán
  handlePayment(): void {
    const selectedItems = this.cartItems.filter(item => item.selected);
    if (selectedItems.length > 0) {
      // Gọi hàm thanh toán từ PaymentService
      this.paymentService.paymentWithPayos(1 + 6, this.calculateSelectedTotal()).subscribe(
        (response) => {
          // Xử lý phản hồi từ server
          console.log('Thanh toán thành công:', response);
          console.log('Redirecting to:', response.checkoutUrl);
          window.location.href = response.checkoutUrl;

        });
    } else {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
    }
  }

}
