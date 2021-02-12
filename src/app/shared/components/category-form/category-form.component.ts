import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private categorySvc: CategoryService) {
    const navigation = this.router.getCurrentNavigation();
    this.category = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.category === 'undefined') {
      this.router.navigate(['newCategory']);
    }else{
      this.categoryForm.patchValue(this.category);
    }
  }

  onGoToBackList(): void {
    this.router.navigate(['listCategory']);
  }

  isValidField(field: string):string{
    const validatedField = this.categoryForm.get(field);
    return (!validatedField.valid && validatedField.touched) 
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave(): void {
    Swal.fire({
      title: 'Your category saved!',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer:2000
    })
    if(this.categoryForm.valid){
      const employee = this.categoryForm.value;
      const employeeId = this.category?.id || null;
      this.categorySvc.onSaveCategories(employee, employeeId);
      this.categoryForm.reset();
    }
  }
  private initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    })
  }
}
