import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { RestaurantDish } from '../models/restaurant-dish';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css'
})
export class DishCardComponent implements OnInit{
  router = inject(Router);
  userService = inject(UserService);

  @Input() restaurantDish: RestaurantDish;

  isChecked;
  loggedUser: User;

  ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => {
      this.loggedUser = user;
      
      if(this.loggedUser.favoritesDishes.find(dish => this.restaurantDish.id === dish.id)){
        this.isChecked = true;
      }
    })
  }

  navigateToDetails() {
    localStorage.setItem('restaurantDishId', this.restaurantDish.id);

    this.router.navigate(['/details'], { queryParams: { 
      isAlternative: false
    }});
  }

  checkAsFavorite(){
    this.isChecked = !this.isChecked;

    if(this.isChecked){
      this.loggedUser.favoritesDishes.push(this.restaurantDish)
    }
    else {
      this.loggedUser.favoritesDishes = this.loggedUser.favoritesDishes.filter(dish => dish.id !== this.restaurantDish.id);
    }

    this.userService.updateFavoritesList(this.loggedUser.uid, this.loggedUser.favoritesDishes)
  }
}
