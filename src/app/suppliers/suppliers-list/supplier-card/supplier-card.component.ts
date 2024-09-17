import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Supplier } from '../../supplier.dto';

@Component({
  selector: 'app-supplier-card',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './supplier-card.component.html',
  styles: `
  mat-card{
    cursor: pointer;
  }
  mat-card:hover{
    transform: scale(1.05);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: rgba(173, 216, 230, 0.5);
  }
  `,
})
export class SupplierCardComponent {
  @Input({ required: true }) supplier: Supplier;
}
