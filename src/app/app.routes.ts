import { Component } from '@angular/core';
import { Routes } from '@angular/router';
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
