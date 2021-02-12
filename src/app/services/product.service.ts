import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './../shared/models/product.interface'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Observable<Product[]>;
  product: any[] = [];
  cartTotal = 0;
  cart: any = [];
  tota: any[] = [];
  contador: number = 0;


  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private readonly afs: AngularFirestore, private router: Router) {
    this.productsCollection = afs.collection<Product>('products');
    this.getProducts();
  }

  onDelete(empId: string): Promise<void> {
    return new Promise(async (resolve, rejects) => {
      try {
        const result = this.productsCollection.doc(empId).delete();
        resolve(result);
      } catch (error) {
        rejects(error.message);
      }
    })
  }

  onSaveEmploye(employee: Product, empId: string): Promise<void> {
    return new Promise(async (resolve, rejects) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...employee };
        const result = this.productsCollection.doc(id).set(data);
        resolve(result);
        this.router.navigate(['list']);
      } catch (error) {
        rejects(error.message);
      }
    })
  }

  public getProducts(): void {
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    );
  }
  addProductToCart(product) {    
    this.cart.push(product);
  }
  listShop(){
    return this.cart;
  };
  listTotal(){
    for (let i = 0; i < this.cart.length; i++) {
      this.tota.push(this.cart[i].price);
    }
    return this.tota;
  }
  bell(){
    return this.contador;
  }
}
