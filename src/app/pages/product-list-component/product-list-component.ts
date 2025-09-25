import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-product-list-component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ScrollingModule, InfiniteScrollModule],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent {
  q = new FormControl('');
  category = new FormControl('all');
  sort = new FormControl('popular');

  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    const all$ = this.ps.getAll(); // => Observable<Product[]>
    this.categories$ = this.ps.categories$();

    this.products$ = combineLatest([
      all$,
      this.q.valueChanges.pipe(startWith('')),
      this.category.valueChanges.pipe(startWith('all')),
      this.sort.valueChanges.pipe(startWith('popular'))
    ]).pipe(
      map(([list, q, category, sort]) => {
        const ql = (q || '').toLowerCase().trim();
        const arr = Array.isArray(list) ? list : [];
        let res = arr.filter(p =>
          (
            !ql ||
            (p.title || '').toLowerCase().includes(ql) ||
            ((p.tags || []).some(t => (t || '').toLowerCase().includes(ql)))
          ) &&
          (category === 'all' || (p.category || '') === category)
        );

        if (sort === 'price-asc') res = [...res].sort((a,b) => (a.price||0) - (b.price||0));
        if (sort === 'price-desc') res = [...res].sort((a,b) => (b.price||0) - (a.price||0));
        return res;
      })
    );
  }

  trackById(_index: number, item: Product) {
    return item?.id ?? _index;
  }
}
