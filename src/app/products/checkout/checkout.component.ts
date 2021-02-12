import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  list: any;
  tot: any[] = [];
  total: any;
  constructor(private productSvc: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.listCarrito();
  }

  listCarrito() {
    var suma = 0;
    this.list = this.productSvc.listShop();
    this.tot = this.productSvc.listTotal();
    this.tot.forEach(function (numero) {
      var num = parseInt(numero);
      suma += num;
    })
    this.total = suma;
  }
  onGoToBackList(): void {
    this.router.navigate(['list']);
  }
}
