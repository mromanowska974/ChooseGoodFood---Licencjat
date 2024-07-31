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
import { SortPanelComponent } from "../sort-panel/sort-panel.component";
import { FilterPanelComponent } from "../filter-panel/filter-panel.component";

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [
    DishCardComponent,
    ButtonDirective,
    InputDirective,
    CommonModule,
    FormsModule,
    SortPanelComponent,
    FilterPanelComponent
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
  unsortedList: RestaurantDish[];
  fullList: RestaurantDish[];

  listType = 'full';
  sortMode = false;
  filterMode = true;
  loggedUser: User;
  searchPhrase: string = ''
  sortCriteria: any;

  ngOnInit(): void { 
    localStorage.removeItem('homeDishId');
    localStorage.removeItem('restaurantDishId');
    this.dishesService.getRestaurantDishes().then((dishes) => {
      this.fullList = dishes;
      this.dishes = this.fullList.slice();
      this.unsortedList = this.fullList.slice();
    })

    this.userService.loggedUser.subscribe(user => {
      this.loggedUser = user
    });
  }
  
  onSort(){
    this.sortMode = true;
  }

  onSortCriteriaReceived(event){
    this.sortCriteria = event;

    this.dishes = this.unsortedList.slice()

    this.dishes.sort((a, b) => {
      return (this.sortCriteria.nameSort === 'ascend' ? a.name.localeCompare(b.name) : -1* a.name.localeCompare(b.name))
      || (this.sortCriteria.priceSort === 'ascend' ? a.price - b.price : b.price - a.price)
      || (this.sortCriteria.caloriesSort === 'ascend' ? a.calories - b.calories : b.calories - a.calories)
      || (this.sortCriteria.glycemicIndexSort === 'ascend' ? a.glycemicIndex - b.glycemicIndex : b.glycemicIndex - a.glycemicIndex)
      || 0;
    })
  }

  onFilter(){
    this.filterMode = true;
  }

  onFilterCriteriaReceived(event){
    console.log(event)

    this.dishes = this.fullList.slice();

    this.dishes =  this.dishes.filter(dish => {
      return (event.priceFilter === 'above' ? dish.price > event.priceValues[0] 
        : event.priceFilter === 'below' ? dish.price < event.priceValues[0]
        : event.priceFilter === 'fromTo' ? dish.price > event.priceValues[0] && dish.price < event.priceValues[1]
        : event.priceFilter === 'exact' ? dish.price === event.priceValues[0]
        : 1
      )
    }).filter(dish => {
      return (event.caloriesFilter === 'above' ? dish.calories > event.caloriesValues[0] 
        : event.caloriesFilter === 'below' ? dish.calories < event.caloriesValues[0]
        : event.caloriesFilter === 'fromTo' ? dish.calories > event.caloriesValues[0] && dish.calories < event.caloriesValues[1]
        : event.caloriesFilter === 'exact' ? dish.calories === event.caloriesValues[0]
        : 1
      )
    }).filter(dish => {
      return (event.glycemicIndexFilter === 'above' ? dish.glycemicIndex > event.glycemicIndexValues[0] 
        : event.glycemicIndexFilter === 'below' ? dish.glycemicIndex < event.glycemicIndexValues[0]
        : event.glycemicIndexFilter === 'fromTo' ? dish.glycemicIndex > event.glycemicIndexValues[0] && dish.glycemicIndex < event.glycemicIndexValues[1]
        : event.glycemicIndexFilter === 'exact' ? dish.glycemicIndex === event.glycemicIndexValues[0]
        : 1
      )
    })
  }

  onLeaveSortMode(){
    this.sortMode = false;
  }

  onLeaveFilterMode(){
    this.filterMode = false;
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
    this.searchPhrase = ''
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
