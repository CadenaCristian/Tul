import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { CategoryFormModule } from './../../shared/components/category-form/category-form.module';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    CategoryFormModule
  ]
})
export class NewModule { }
