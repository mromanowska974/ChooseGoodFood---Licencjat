import { inject, Injectable } from '@angular/core';
import { Firestore, getDocs, collection, doc, getDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  firestore = inject(Firestore)

  restaurantDishes = this.getRestaurantDishes().then(dishes => dishes);

  getRestaurantDishes() {
    const docRef = collection(this.firestore, 'restaurant_dish');
    return getDocs(docRef).then(data => data.docs.map(item => {
      return {
        id: item.id,
        name: item.data()['name'],
        calories: item.data()['calories'],
        portion: item.data()['portion'],
        price: item.data()['price'],
        glycemicIndex: item.data()['glycemic_index'],
        homeDishId: item.data()['home_dish_id'],
        imageUrl: item.data()['image-url'],
        imageCredits: item.data()['image-credits']
      }
    }))
  }

  getRestaurantDish(id: string) {
    return this.restaurantDishes.then(dishes => dishes.find(dish => dish.id === id))
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
        glycemicIndex: item.data()!['glycemic_index'],
        imageUrl: item.data()!['image-url'],
        imageCredits: item.data()!['image-credits']
      }
    }))
  }
}