import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { CustomerDetails } from '../../model/shared-details';
import { SharedService } from '../../service/shared.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  password!: string;
  confirmPassword!: string;
  
  constructor(private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog  ) {
  }

  ngOnInit() {
  }

  get formValid() {
    if (this.password && this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(): void {
    let body = {
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    this.sharedService.post(AppConstants.PASSWORD_UPDATE, body).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "36%";
        dialogConfig.data = {
          showCancel: false,
          popupTitle: 'Success!! Password has been changed successfully',
          actionText: 'Ok'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this._router.navigateByUrl('/home');
        });
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
      }
    });
  }
}
  
