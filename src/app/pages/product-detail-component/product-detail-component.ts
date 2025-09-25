import { Component, DOCUMENT, inject } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../shared/services/product-service';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private ps = inject(ProductService);
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  product?: Product;
  notFound = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.ps.getById(id).subscribe(p => {
      if (!p) { this.notFound = true; return; }
      this.product = p;
      this.setMetaAndJsonLd(p);
    });
  }

  private setMetaAndJsonLd(p: Product) {
    this.title.setTitle(p.title);
    this.meta.updateTag({ name: 'description', content: p.description || `${p.title} - Giá ${p.price} ${p.currency || 'VND'}` });
    this.meta.updateTag({ property: 'og:title', content: p.title });
    this.meta.updateTag({ property: 'og:description', content: p.description || '' });
    this.meta.updateTag({ property: 'og:image', content: p.image || '' });

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.title,
      "image": p.images || [p.image],
      "description": p.description || '',
      "sku": p.id,
      "offers": {
        "@type": "Offer",
        "url": p.affiliateUrl,
        "priceCurrency": p.currency || 'VND',
        "price": p.price
      }
    };

    // remove previous injected JSON-LD if any
    const prev = this.doc.head.querySelector('script[type="application/ld+json"][data-generated="true"]');
    if (prev) prev.remove();
    const s = this.doc.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-generated', 'true');
    s.text = JSON.stringify(jsonLd);
    this.doc.head.appendChild(s);
  }
}
