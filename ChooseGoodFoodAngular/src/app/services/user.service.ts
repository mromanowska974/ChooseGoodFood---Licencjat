import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = inject(Firestore);

  loggedUser = new BehaviorSubject<any>(null);

  setLoggedUser(user){
    this.loggedUser.next(user);
  }

  getUser(uid){
    const docRef = doc(this.firestore, 'users', uid);

    return getDoc(docRef);
  }

  createUser(userData){
    const docRef = doc(this.firestore, 'users', userData.uid);

    return setDoc(docRef, {
      email: userData.email,
      favouriteDishes: userData.favouriteDishes
    });
  }
}
