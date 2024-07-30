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
          favouriteDishes: user.data()!['favouriteDishes']
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
        favouriteDishes: []
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
      favouriteDishes: data.favouriteDishes ? data.favouriteDishes : []
    }

    this.userService.setLoggedUser(user)

    this.router.navigate(['list'])
  }
}
