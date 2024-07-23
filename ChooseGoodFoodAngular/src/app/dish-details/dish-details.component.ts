import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishesService } from '../services/dishes.service';

@Component({
  selector: 'app-dish-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dish-details.component.html',
  styleUrl: './dish-details.component.css'
})
export class DishDetailsComponent implements OnInit, OnDestroy{
  route = inject(ActivatedRoute);
  router = inject(Router);
  dishesService = inject(DishesService);

  isAlternativeDetailsPage: boolean = false;
  dish: any;

  sub: Subscription;

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.isAlternativeDetailsPage = params['isAlternative'] === 'true';
      this.dishesService.getRestaurantDish(localStorage.getItem('restaurantDishId')!).subscribe(item => {
        this.dish = item
      })
      if(this.isAlternativeDetailsPage){
        console.log(this.isAlternativeDetailsPage)
        this.dishesService.getHomeDish(localStorage.getItem('homeDishId')!).subscribe(item => {
          this.dish = item
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  navigateToComparison(): void {
    this.router.navigate(['/comparison']);
  }

  navigateToAlternativeDetails(): void {
    localStorage.setItem('homeDishId', this.dish.homeDishId)
    this.router.navigate(['/alternative-details'], { queryParams: { 
      isAlternative: true,
    }});
  }
}
