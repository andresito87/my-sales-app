import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Product } from '../product.dto';
import { CartItem } from '../../cart.dto';
import { CartService } from '../../cart.service';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MaterialModule,
    ProductCardComponent,
    AsyncPipe,
    LoadingBarComponent,
    CurrencyPipe,
  ],
  templateUrl: './product-card.component.html',
  styles: ``,
})
export class ProductCardComponent {
  @Input() product: Product;
  cartService = inject(CartService);

  onAddToCart(item: Product) {
    const cartItem: CartItem = {
      idProduct: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice,
    };
    this.cartService.addItem(cartItem);
  }
}
