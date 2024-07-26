import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comparison-page',
  standalone: true,
  imports: [],
  templateUrl: './comparison-page.component.html',
  styleUrl: './comparison-page.component.css'
})
export class ComparisonPageComponent implements OnInit, OnDestroy {
  dishesService = inject(DishesService);

  rSub: Subscription;
  hSub: Subscription;

  restaurantDish;
  homeDish;

  ngOnInit(): void {
     this.dishesService.getRestaurantDish(localStorage.getItem('restaurantDishId')!).then(dish => {
      this.restaurantDish = dish
    })

     this.hSub = this.dishesService.getHomeDish(localStorage.getItem('homeDishId')!).subscribe(hDish => {
      this.homeDish = hDish
     })
  }

  ngOnDestroy(): void {
     this.hSub.unsubscribe();
  }
}
