import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserLoginDetail } from '../../../model/user-detail';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AppSideLoginComponent implements OnInit {

  public loginValid = true;
  public username = '';
  public password = '';
  public userType!: string;
  public userDetail!: UserLoginDetail;
  error!: string;

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    if ((this._authService.isLoggedIn())) {
      this._router.navigateByUrl('/home');
    }
  }

  public ngOnInit(): void {
    if ((this._authService.isLoggedIn())) {
      this._router.navigateByUrl('/home');
    }
  }

  public onSubmit(): void {
    this.loginValid = true;
    this.userDetail = {
      username: this.username,
      password: this.password,
      userType: this.userType
    };

    this._authService.login(this.userDetail).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        console.log("res: " + JSON.stringify(res));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        localStorage.setItem('nameOfUser', res.nameOfUser);
        this.loginValid = true;
        this._router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
        this.error = err.error.error;
        this.loginValid = false
      }
    });
  }
}
