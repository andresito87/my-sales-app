import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { lastValueFrom, Observable } from 'rxjs';
import { Supplier } from '../supplier.dto';
import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { LoadingBarComponent } from '../../loading-bar.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [
    SupplierCardComponent,
    MaterialModule,
    LoadingBarComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './suppliers-list.component.html',
  styles: `
    mat-card-actions {
      margin: 20px 0 0 0;
    }
  `,
})
export class SuppliersListComponent implements OnInit {
  suppliers!: Supplier[];
  supplierObservable!: Observable<Supplier[]>;

  constructor(private supplierService: SupplierService) {}

  async ngOnInit() {
    this.supplierObservable = this.supplierService.getAll();
    this.suppliers = await lastValueFrom(this.supplierObservable);
  }
}
