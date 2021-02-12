import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsFormModule } from 'src/app/shared/components/products-form/products-form.module';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    ProductsFormModule
  ]
})
export class EditModule { }
