import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { DishesService } from './services/dishes.service';
import { HomeDish } from './models/home-dish';
import { RestaurantDish } from './models/restaurant-dish';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ChooseGoodFoodAngular';

  userService = inject(UserService);
  dishesService = inject(DishesService);

  ngOnInit(): void {
      if(localStorage.getItem('uid') !== null){
        this.userService.getUser(localStorage.getItem('uid')).then(user => {
          this.userService.setLoggedUser({
            uid: user.id,
            email: user.data()!['email'],
            favoritesDishes: user.data()!['favoritesDishes']
          })
        })
      }

      if(localStorage.getItem('homeDishId') !== null){
        this.dishesService.getHomeDish(localStorage.getItem('homeDishId')!).then(dish => {
          this.dishesService.getIngredients(dish.id, 'home_dishes').then(ingredients => {
            let homeDish: HomeDish = dish;
            homeDish.ingredients = ingredients

            this.dishesService.setCurrentHomeDish(homeDish)
          })
        })
      }

      if(localStorage.getItem('restaurantDishId') !== null){
        this.dishesService.getRestaurantDish(localStorage.getItem('restaurantDishId')!).then(dish => {
          this.dishesService.getIngredients(dish!.id, 'restaurant_dish').then(ingredients => {
            let restaurantDish: RestaurantDish = dish!;
            restaurantDish.ingredients = ingredients

            this.dishesService.setCurrentRestaurantDish(restaurantDish)
          })
        })
      }
  }
}
