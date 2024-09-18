import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { SupplierService } from '../supplier.service';
import { lastValueFrom, Observable } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { AsyncPipe } from '@angular/common';
import { LoadingBarComponent } from '../../loading-bar.component';
import { SuppliersFormComponent } from '../suppliers-form/suppliers-form.component';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    LoadingBarComponent,
    SuppliersFormComponent,
  ],
  templateUrl: './suppliers-edit.component.html',
  styles: `
  mat-card-actions {
      margin: 20px 0 0 0;
    }
    mat-card-actions button{
      margin: 0 10px;
    }
  `,
})
export class SuppliersEditComponent {
  route = inject(ActivatedRoute);
  supplierService = inject(SupplierService);
  supplier: Supplier;
  supplierObservable: Observable<Supplier>;
  router = inject(Router);

  async ngOnInit() {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.supplierObservable = this.supplierService.getById(id);
    this.supplier = await lastValueFrom(this.supplierObservable);
    console.log(this.supplier);
  }

  async onSave(supplier: Supplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    this.supplier = await lastValueFrom(this.supplierObservable);
    this.router.navigate(['/suppliers/show/', supplier?.id]);
  }

  onBack() {
    this.router.navigate(['/suppliers']);
  }
}
