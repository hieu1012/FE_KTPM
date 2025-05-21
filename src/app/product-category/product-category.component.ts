import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROUTING } from '@constants/routing';
import { ProductService } from '@services/product.service';
import { CategoryService } from '@services/category.service';
import { ManufactureService } from '@services/manufacture.service';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from '../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, PriceFormatPipe, RouterModule]
})
export class ProductCategoryComponent implements OnInit {
  ROUTING = ROUTING;

  idCategory: number = 0;
  category: string | null = null;

  allProducts: any[] = [];
  products: any[] = [];      // Sau lọc + sắp xếp
  pagedProducts: any[] = []; // Hiển thị trang hiện tại

  manufactures: any[] = [];
  selectedManufactures: { [id: number]: boolean } = {};
  selectedPriceRange: string | null = null;

  // Phân trang
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  // Sắp xếp
  sortOption: 'az' | 'za' | 'low-high' | 'high-low' | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private manufactureService: ManufactureService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCategory = Number(params.get('id'));
      this.loadCategory();
      this.loadManufactures();
      this.loadAllProducts();
      // Tự động cuộn lên đầu trang khi vào trang danh mục sản phẩm
      window.scrollTo(0, 0);
    });
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.idCategory).subscribe({
      next: (res) => {
        this.category = res.data?.name || 'Danh mục';
      },
      error: (err) => console.error('Lỗi lấy danh mục:', err)
    });
  }

  loadManufactures(): void {
    this.manufactureService.getAllManufactures().subscribe({
      next: (res) => {
        this.manufactures = res.data || res;
      },
      error: (err) => console.error('Lỗi lấy hãng:', err)
    });
  }

  loadAllProducts(): void {
    this.productService.getProductsByCategoryId(this.idCategory).subscribe({
      next: (res: any) => {
        if (res?.data?.result) {
          this.allProducts = res.data.result;
        } else if (res?.data) {
          this.allProducts = res.data;
        } else {
          this.allProducts = res;
        }

        this.applyFilters();
      },
      error: (err) => console.error('Lỗi lấy sản phẩm:', err)
    });
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];

    // Lọc theo hãng
    const selectedIds = Object.entries(this.selectedManufactures)
      .filter(([_, checked]) => checked)
      .map(([id]) => Number(id));
    if (selectedIds.length > 0) {
      filtered = filtered.filter(p => selectedIds.includes(p.manufacture?.id));
    }

    // Lọc theo giá
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Sắp xếp
    switch (this.sortOption) {
      case 'az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    this.products = filtered;
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.currentPage = 1;
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedManufactures = {};
    this.selectedPriceRange = null;
    this.sortOption = null;
    this.applyFilters();
  }

  // Hàm xử lý khi chọn sắp xếp
  setSort(option: 'az' | 'za' | 'low-high' | 'high-low'): void {
    this.sortOption = option;
    this.applyFilters();
  }
}
