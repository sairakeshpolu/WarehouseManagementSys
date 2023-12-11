import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { CustomerDetails } from '../../model/shared-details';
import { UserDetail } from '../../model/user-detail';
import { SharedService } from '../../service/shared.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  userDetails!: UserDetail;
  
  constructor(private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog  ) {
  }

  ngOnInit() {
    this.sharedService.get(AppConstants.USER).pipe(
      take(1)
    ).subscribe({
      next: (res: UserDetail) => {
        this.userDetails = res;
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
      }
    });
  }
}
  
