import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { ProductsFormModule } from 'src/app/shared/components/products-form/products-form.module';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    ProductsFormModule
  ]
})
export class NewModule { }
