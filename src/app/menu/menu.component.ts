import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { environment } from '../../environments/environment';

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
    <a [href]="baseHref + item.path">{{ item.label }}</a>
    }`,
  styles: ``,
})
export class MenuComponent {
  baseHref: string = environment.baseHref;

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
