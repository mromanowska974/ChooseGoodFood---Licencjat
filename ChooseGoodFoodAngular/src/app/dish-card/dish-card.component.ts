import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-card',
  standalone: true,
  imports: [],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.css'
})
export class DishCardComponent implements OnInit{
  router = inject(Router);

  @Input() restaurantDish: any;

  ngOnInit(): void {
    console.log(this.restaurantDish)
  }

  navigateToDetails() {
    localStorage.setItem('restaurantDishId', this.restaurantDish.id);

    this.router.navigate(['/details'], { queryParams: { 
      isAlternative: false
    }});
  }
}
