import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesItem } from './categories-datasource';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }

  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CategoryFormComponent,
    MatIconModule,
  ],
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();
  showform: Boolean = false;
  category!: Category;

  constructor(private categoryService: CategoryService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  ngAfterViewInit(): void {
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
    if (confirm(`Delete "${category.name}" with id ${category.id} ?`)) {
      await lastValueFrom(this.categoryService.delete(category.id));
      this.loadCategories();
    }
  }

  async loadCategories(): Promise<void> {
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  async onSave(category: Category): Promise<void> {
    const saved = await lastValueFrom(this.categoryService.save(category));
    console.log('Saved', saved);
    this.hideCategoryForm();
  }
}
