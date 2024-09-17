import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { SupplierService } from '../supplier.service';
import { lastValueFrom, Observable } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';

@Component({
  selector: 'app-suppliers-show',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingBarComponent, RouterLink],
  templateUrl: './suppliers-show.component.html',
  styles: ``,
})
export class SuppliersShowComponent implements OnInit {
  // ActivateRoute is a service that provides access to information
  // about a route associated with a component that is loaded in an outlet.
  // We can get supplier id from the route snapshot.
  route = inject(ActivatedRoute);
  supplierService = inject(SupplierService);
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;

  async ngOnInit() {
    // + is a unary operator that converts its operand to a number.
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier);
  }
}
