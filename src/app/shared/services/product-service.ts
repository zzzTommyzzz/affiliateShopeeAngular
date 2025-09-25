import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'assets/products.json';
  products$!: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = this.http.get<Product[]>(this.url).pipe(shareReplay(1));
  }

  getAll(): Observable<Product[]> {
    return this.products$;
  }

  getById(id: string): Observable<Product | undefined> {
    return this.products$.pipe(map(list => list.find(p => String(p.id) === String(id))));
  }

  categories$(): Observable<string[]> {
    return this.products$.pipe(
      map(list => Array.from(new Set(list.map(p => p.category || '').filter(Boolean))))
    );
  }
}
