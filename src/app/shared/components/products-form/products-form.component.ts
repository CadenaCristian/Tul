import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from '../../models/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  products$ = this.productSvc.products;
  cate$ = this.cateSvc.categories;

  product: Product;
  productForm: FormGroup;
  cate: Category;

  constructor(private router: Router,private cateSvc:CategoryService, private store:AngularFireStorage, private fb: FormBuilder, private productSvc: ProductService) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.product === 'undefined') {
      this.router.navigate(['new']);
    } else {
      this.productForm.patchValue(this.product);
    }
  }

  onGoToBackList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string):string{
    const validatedField = this.productForm.get(field);
    return (!validatedField.valid && validatedField.touched) 
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave(): void {
    if(this.productForm.valid){
      const employee = this.productForm.value;
      const employeeId = this.product?.id || null;
      this.productSvc.onSaveEmploye(employee, employeeId);
      this.productForm.reset();
      Swal.fire({
        title: 'Your product saved!',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer:2000
      })
    }
  }
  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }
}
