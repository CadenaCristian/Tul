import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form.component';



@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[CategoryFormComponent]
})
export class CategoryFormModule { }
