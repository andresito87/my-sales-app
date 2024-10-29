import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart.dto';
import { MaterialModule } from '../material.module';
import { CartService } from './../cart.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MaterialModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styles: ``,
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  public items: CartItem[] = [];

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }
}
