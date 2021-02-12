import { Injectable } from '@angular/core';
import "firebase/auth";
import "firebase";
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.message,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 10000
      })
    }

  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result; 
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.message,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 10000
      })
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();      
    } catch (error) {
      console.log(error);
    }
  }
}
