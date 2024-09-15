import { Component } from '@angular/core';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DasboardComponent } from './dasboard/dasboard.component';

export const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: '',
    component: DasboardComponent,
  },
];

export const appRouterProviders = [provideRouter(routes, withHashLocation())];
