import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginService = inject(LoginService);
  userService = inject(UserService);
  router = inject(Router);

  onLogin(email, password){
    console.log(email, ' ', password)
    this.loginService.login(email, password).then(data => {
      this.userService.getUser(data.user.uid).then(user => {
        this.setActiveUser({
          uid: user.id,
          email: user.data()!['email'],
          favoritesDishes: user.data()!['favoritesDishes']
        })
      })
    })
  }

  onRegister(email, password){
    console.log(email, ' ', password)
    this.loginService.register(email, password).then(data => {
      this.userService.createUser({
        uid: data.user.uid,
        email: data.user.email,
        favoriteDishes: []
      }).then(() => {
        this.setActiveUser(data.user)
      })
    })
  }

  setActiveUser(data){
    localStorage.setItem('uid', data.uid);
    let user = {
      uid: data.uid,
      email: data.email,
      favoritesDishes: data.favoritesDishes ? data.favoritesDishes : []
    }

    this.userService.setLoggedUser(user)

    this.router.navigate(['list'])
  }
}
