import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  auth = inject(Auth);

  login(email, password){
    return signInWithEmailAndPassword(this.auth, email, password).then();
  }

  register(email, password){
    return createUserWithEmailAndPassword(this.auth, email, password).then();
  }

  logout(){
    return signOut(this.auth).then();
  }
}
