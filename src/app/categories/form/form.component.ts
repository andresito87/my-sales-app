import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Category } from '../category.dto';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './form.component.html',
  styles: ``,
})
export class CategoryFormComponent {
  // Inject FormBuilder, another way to inject/use a formBuilder
  private formBuilder: FormBuilder = inject(FormBuilder);

  // Create a form group with the FormBuilder with validators
  categoryForm = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
  });

  // Bind the back and save events to the component,
  // so the parent component can listen to them
  @Output() back = new EventEmitter<void>();
  @Output() save = new EventEmitter<Category>();

  // To update category, component will receive a category object and set the form values
  @Input() set category(category: Category) {
    this.categoryForm.setValue(category);
  }

  onSubmit() {
    console.log('Button save clicked in the CategoryFormComponent');
    this.save.emit(this.categoryForm.value as Category);
  }

  onBack(): void {
    this.back.emit();
  }
}
