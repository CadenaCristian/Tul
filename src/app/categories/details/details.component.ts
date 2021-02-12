import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  category: Category;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }
  constructor(private router: Router, private categoriesSvc: CategoryService) {
    const navigation = this.router.getCurrentNavigation();
    this.category = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.category === 'undefined') {
      this.router.navigate(['listCategory'])
    }
  }
  onGoToEdit(): void {
    this.navigationExtras.state.value = this.category;
    this.router.navigate(['editCategory'], this.navigationExtras);
  }
  async onDelete(): Promise<void> {
    try {
      Swal.fire({
        title: 'Your category has been deleted!',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer:2000
      })
      await this.categoriesSvc.onDelete(this.category?.id);
      this.router.navigate(['listCategory']);
    } catch (error) {
      console.log(error);
    }
  }
  onGoBackToList(): void {
    this.router.navigate(['listCategory']);
  }
}
