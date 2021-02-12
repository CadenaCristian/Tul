import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsFormComponent } from './products-form.component';



@NgModule({
  declarations: [ProductsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[ProductsFormComponent]
})
export class ProductsFormModule { }
