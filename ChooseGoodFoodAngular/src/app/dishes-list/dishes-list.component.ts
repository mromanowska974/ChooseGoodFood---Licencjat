import { Component, inject } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { RestaurantDish } from '../models/restaurant-dish';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [
    DishCardComponent,
    ButtonDirective,
    InputDirective,
    CommonModule,
    FormsModule
  ],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.css'
})
export class DishesListComponent {
  dishesService = inject(DishesService);
  loginService = inject(LoginService);
  userService = inject(UserService);
  router = inject(Router);

  dishes: RestaurantDish[];
  fullList: RestaurantDish[];

  listType = 'full';
  loggedUser: User;
  searchPhrase: string = ''

  ngOnInit(): void { 
    localStorage.removeItem('homeDishId');
    localStorage.removeItem('restaurantDishId');
    this.dishesService.getRestaurantDishes().then((dishes) => {
      this.fullList = dishes;
      this.dishes = this.fullList;
    })

    this.userService.loggedUser.subscribe(user => {
      this.loggedUser = user
    });
  }
  
  onSort(){
    
  }

  onFilter(){

  }

  onInputChange(){
    console.log(this.searchPhrase);
    let newList = this.dishes.filter(dish => dish.name.toLowerCase().includes(this.searchPhrase))

    this.dishes = newList

    if(this.searchPhrase === ''){
      this.dishes = this.fullList
    }
  }

  onLogOut(){
    this.loginService.logout().then(() => {
      localStorage.removeItem('uid');
      this.router.navigate(['login'])
    })
  }

  onFavoritesList() {
    if(this.listType === 'full'){
      this.listType = 'favorites'
      console.log(this.loggedUser)
      this.dishes = this.loggedUser.favoritesDishes
    }
    else if (this.listType === 'favorites') {
      this.listType = 'full';
      this.dishes = this.fullList;
    }
  }
}
