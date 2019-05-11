import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state: any = {};
  loginErrorMessage: string;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.state.loginFlow = 'normal';
  }

  forgotPassword() {
    this.state.loginFlow = 'recovery';
  }

  submitForgotPassword() {
    this.state.loginFlow = 'normal';
  }

  login() {
    this.loginErrorMessage = null;

    if (!this.state.username || !this.state.password) {
      return this.loginErrorMessage = 'Please enter the username and password';
    }

    this.authService
      .login(this.state.username, this.state.password)
      .subscribe(
        user => {
          this.state.user = user;
          this.next();
        },
        err => {
          this.loginErrorMessage = 'Invalid username or password';
        }
      );
  }

  next() {
    this.router.navigateByUrl('/dashboard');
  }
}
