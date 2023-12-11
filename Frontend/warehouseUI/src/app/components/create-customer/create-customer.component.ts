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
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  category!: string;
  stock: number = 1;
  price: number = 0;
  checked = true;
  customerType: String[] = ["Retail", "Distributor", "Wholesale"];
  terms: String[] = ["COD Cheque", "COD Cash", "B To B"];
  customerDetails!: CustomerDetails;
  
  constructor(private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog  ) {
  }

  ngOnInit() {
    this.customerDetails = new CustomerDetails();
  }

  get formValid() {
    if (this.customerDetails.customer_firstName && this.customerDetails.customer_lastName && this.customerDetails.store_name
      && this.customerDetails.customer_type && this.customerDetails.terms && this.customerDetails.address
      && this.customerDetails.contact_person && this.customerDetails.email && this.customerDetails.phone_number) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(): void {
    this.sharedService.post(AppConstants.CUSTOMERS, this.customerDetails).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "36%";
        dialogConfig.data = {
          showCancel: false,
          popupTitle: 'Success!! Customer has been created successfully',
          actionText: 'Ok'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this._router.navigateByUrl('/all-customers');
        });
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
      }
    });
  }

  cancel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "36%";
    dialogConfig.data = {
      showCancel: true,
      popupTitle: 'Are you sure you want to cancel?',
      actionText: 'Yes',
      cancelText: 'No'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerDetails = new CustomerDetails();
      }
    });
  }
}
  
