import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  categories$ = this.categoriesSvc.categories;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }
  constructor(private categoriesSvc: CategoryService, private router:Router) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['editCategory'], this.navigationExtras);
  }
  onGoToSee(item: any): void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['detailsCategory'], this.navigationExtras);
  }
  async onGoToDelete(empId: string): Promise<void> {
    try {
      Swal.fire({
        title: 'Your category has been deleted!',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer:2000
      })
      await this.categoriesSvc.onDelete(empId);
      this.router.navigate(['listCategory']);
    } catch (error) {
      console.log(error);
    }
  }
  onGoBackToList(): void {
    this.router.navigate(['home']);
  }
}
