import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DasboardComponent } from './dasboard/dasboard.component';

export const routes: Routes = [
  {
    path: '/my-sales-app/categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: '',
    component: DasboardComponent,
  },
];
