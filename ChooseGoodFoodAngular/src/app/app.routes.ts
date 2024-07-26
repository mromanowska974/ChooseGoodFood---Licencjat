import { Routes } from '@angular/router';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { ComparisonPageComponent } from './comparison-page/comparison-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'list', component: DishesListComponent },
    { path: 'favourites', component: DishesListComponent },
    { path: 'details', component: DishDetailsComponent },
    { path: 'alternative-details', component: DishDetailsComponent },
    { path: 'comparison', component: ComparisonPageComponent },
];