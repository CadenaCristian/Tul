import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contador: number = 0;
  products$ = this.productsSvc.products;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }
  constructor(private router: Router, private productsSvc: ProductService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  onGoToSee(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }
  async onGoToDelete(empId: string): Promise<void> {
    Swal.fire({
      title: 'Your product has been deleted!',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer:2000
    })
    try {
      await this.productsSvc.onDelete(empId);
      this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }
  onAddToCart(item) {
    this.contador++;
    this.productsSvc.addProductToCart(item);
  }
  onGoBackToList(): void {
    this.router.navigate(['home']);
  }
}
