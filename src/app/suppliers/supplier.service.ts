import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './supplier.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(environment.api + 'suppliers');
  }

  public getById(id: Number): Observable<Supplier> {
    return this.http.get<Supplier>(environment.api + 'suppliers/' + id);
  }

  public save(supplier: Supplier): Observable<Supplier> {
    if (supplier.id)
      return this.http.put<Supplier>(
        environment.api + 'suppliers/' + supplier.id,
        supplier
      );

    return this.http.post<Supplier>(environment.api + 'suppliers', supplier);
  }

  public delete(id?: number): Observable<Supplier> {
    return this.http.delete<Supplier>(environment.api + 'suppliers/' + id);
  }

  public create(): Supplier {
    return {
      id: 0,
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: {
        city: '',
        phone: '',
        country: '',
        postalCode: 0,
        region: '',
        street: '',
      },
    };
  }
}
