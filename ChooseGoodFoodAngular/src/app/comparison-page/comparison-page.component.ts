import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparison-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './comparison-page.component.html',
  styleUrl: './comparison-page.component.css'
})
export class ComparisonPageComponent implements OnInit, OnDestroy {
  dishesService = inject(DishesService);
  math = Math;

  rSub: Subscription;
  hSub: Subscription;

  restaurantDish;
  homeDish;

  compareValues;

  ngOnInit(): void {
     this.rSub = this.dishesService.currentRestaurantDish.subscribe(dish => {
      this.restaurantDish = dish;

      this.hSub = this.dishesService.currentHomeDish.subscribe(dish => {
       this.homeDish = dish;
       
        this.compareValues = {
          priceCompare: 1-(this.homeDish.price / this.restaurantDish.price),
          caloriesCompare: 1-(this.homeDish.calories / this.restaurantDish.calories),
          glycemicIndexCompare: 1-(this.homeDish.glycemicIndex / this.restaurantDish.glycemicIndex)
        }
      })
     })

  }

  ngOnDestroy(): void {
     this.rSub.unsubscribe();
     this.hSub.unsubscribe();
  }
}
