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

  rSub: Subscription;
  hSub: Subscription;

  restaurantDish;
  homeDish;

  ngOnInit(): void {
     this.dishesService.currentRestaurantDish.subscribe(dish => {
      this.restaurantDish = dish;
     })

     this.hSub = this.dishesService.currentHomeDish.subscribe(dish => {
      this.homeDish = dish;
     })
  }

  ngOnDestroy(): void {
     this.hSub.unsubscribe();
  }
}
