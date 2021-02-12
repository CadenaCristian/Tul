import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Observable<Category[]>;

  private categoriesCollention: AngularFirestoreCollection<Category>
  constructor(private readonly afs: AngularFirestore, private router: Router) {
    this.categoriesCollention = afs.collection<Category>('categories');
    this.getCategories();
  }

  onDelete(empId: string): Promise<void> {
    return new Promise(async (resolve, rejects) => {
      try {
        const result = this.categoriesCollention.doc(empId).delete();
        resolve(result);
      } catch (error) {
        rejects(error.message);
      }
    })
  }
  onSaveCategories(category: Category, empId: string): Promise<void> {
    return new Promise(async (resolve, rejects) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...category };
        const result = this.categoriesCollention.doc(id).set(data);
        resolve(result);
        this.router.navigate(['listCategory'])
      } catch (error) {
        rejects(error.message);
      }
    })
  }

  private getCategories(): void{
    this.categories = this.categoriesCollention.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Category))
    );
  }
}
