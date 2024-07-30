import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ChooseGoodFoodAngular';

  userService = inject(UserService);

  ngOnInit(): void {
      if(localStorage.getItem('uid') !== null){
        this.userService.getUser(localStorage.getItem('uid')).then(user => {
          console.log(user.data())
          this.userService.setLoggedUser({
            uid: user.id,
            email: user.data()!['email'],
            favoritesDishes: user.data()!['favoritesDishes']
          })
        })
      }
  }
}
