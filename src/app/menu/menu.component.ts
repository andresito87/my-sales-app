import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

interface MenuItem {
  /**
   *  La ruta que se cargará cuando hagas clic en el menú
   */
  path: String;
  /**
   * El texto que se mostrará en el menú
   */
  label: String;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule],
  template: ` @for (item of menuItems; track item.path) {
    <a mat-list-item [href]="'/my-sales-app/' + item.path">{{ item.label }}</a>
    }`,
  styles: ``,
})
export class MenuComponent {
  menuItems: Array<MenuItem> = [
    {
      path: '/',
      label: 'Inicio',
    },
    {
      path: '/categories',
      label: 'Categorías',
    },
    {
      path: '/suppliers',
      label: 'Proveedores',
    },
  ];
}
