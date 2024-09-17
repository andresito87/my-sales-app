import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriesItem } from './categories-datasource';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { LoadingBarComponent } from '../loading-bar.component';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    .action-buttons {
      display: flex;
      justify-content: flex-start; /* Cambia esto según la alineación que desees */
      align-items: center;
    }
  `,
  standalone: true,
  imports: [MaterialModule, CategoryFormComponent, LoadingBarComponent],
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();
  showform: Boolean = false;
  category!: Category;
  showLoading: Boolean = false;

  constructor(private categoryService: CategoryService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  ngOnInit(): void {
    this.loadCategories();
  }

  onNewCategoryClick(): void {
    this.category = {
      id: 0,
      name: '',
      description: '',
    };
    this.showform = true;
  }

  onBackForm(): void {
    this.hideCategoryForm();
  }

  hideCategoryForm(): void {
    this.showform = false;
    this.loadCategories();
  }

  onEditCategoryClick(category: Category) {
    console.log('Edit category', category);
    this.category = category;
    this.showform = true;
  }

  async onDeleteCategoryClick(category: Category) {
    if (
      confirm(
        `¿ Estás seguro que deseas eliminar la categoría "${category.name}" con id ${category.id} ?`
      )
    ) {
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id));
      this.showLoading = false;
      this.loadCategories();
    }
  }

  async loadCategories(): Promise<void> {
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.showLoading = false;
  }

  async onSave(category: Category): Promise<void> {
    const saved = await lastValueFrom(this.categoryService.save(category));
    console.log('Saved', saved);
    this.hideCategoryForm();
  }
}
