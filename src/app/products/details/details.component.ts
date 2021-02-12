import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(private router: Router, private productSvc: ProductService) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    if (typeof this.product === 'undefined') {
      this.router.navigate(['list'])
    }
  }
  onGoToEdit(): void {
    this.navigationExtras.state.value = this.product;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  async onDelete(): Promise<void> {
    Swal.fire({
      title: 'Your product has been deleted!',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer:2000
    })
    try {
      await this.productSvc.onDelete(this.product?.id);
      this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }
  onGoBackToList(): void {
    this.router.navigate(['list']);
  }
}
