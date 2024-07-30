import { Component, inject } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { DishCardComponent } from '../dish-card/dish-card.component';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [
    DishCardComponent,
    ButtonDirective,
    InputDirective,
    CommonModule
  ],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.css'
})
export class DishesListComponent {
  dishesService = inject(DishesService);
  loginService = inject(LoginService);
  router = inject(Router);

  restaurantDishes$ = this.dishesService.getRestaurantDishes();

  ngOnInit(): void { 
    
  }
  
  sort(){
    
  }

  filter(){

  }

  onLogOut(){
    this.loginService.logout().then(() => {
      localStorage.removeItem('uid');
      this.router.navigate(['login'])
    })
  }
}
