import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './suppliers.component.html',
  styles: ``,
})
export class SuppliersComponent {}
