import { Product } from './../shared/interfaces';
import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>;
  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(switchMap (params => {
        return this.productServ.getById(params['id'])
      }))
  }

  addToCart(product){
    this.productServ.addProduct(product);
  }

}
