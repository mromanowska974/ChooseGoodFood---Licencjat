import { inject, Injectable } from '@angular/core';
import { Firestore, getDocs, collection, doc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  firestore = inject(Firestore)

  getRestaurantDishes(): Observable<any> {
    const docRef = collection(this.firestore, 'restaurant_dish');
    return from(getDocs(docRef).then(data => data.docs.map(item => {
      return {
        id: item.id,
        name: item.data()['name'],
        calories: item.data()['calories'],
        portion: item.data()['portion'],
        price: item.data()['price'],
        glycemicIndex: item.data()['glycemic_index'],
        homeDishId: item.data()['home_dish_id']
      }
    })))
  }

  getRestaurantDish(id: string) {
    const docRef = doc(this.firestore, 'restaurant_dish', id);
    return from(getDoc(docRef).then(item => {
      return {
        id: item.id,
        name: item.data()!['name'],
        calories: item.data()!['calories'],
        portion: item.data()!['portion'],
        price: item.data()!['price'],
        glycemicIndex: item.data()!['glycemic_index'],
        homeDishId: item.data()!['home_dish_id']
      }
    }))
  }

  getHomeDish(id: string) {
    const docRef = doc(this.firestore, 'home_dishes', id);
    return from(getDoc(docRef).then(item => {
      return {
        id: item.id,
        name: item.data()!['name'],
        calories: item.data()!['calories'],
        portion: item.data()!['portion'],
        price: item.data()!['price'],
        glycemicIndex: item.data()!['glycemic_index']
      }
    }))
  }

  getHomeDishes(): Observable<any> {
    const docRef = collection(this.firestore, 'home_dishes');
    return from(getDocs(docRef).then(data => data.docs.map(item => item.data())))
  }
}