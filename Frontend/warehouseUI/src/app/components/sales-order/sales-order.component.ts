import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem, Order } from '../../model/item-details';
import { CustomerDetails } from '../../model/shared-details';
import { SharedService } from '../../service/shared.service';
import { CreateEditOrderDialogComponent } from '../create-edit-order-dialog/create-edit-order-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'stock', 'price', 'total', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>();
  currentIndex: number = 0;
  recordCount: number = 0;
  customers: string[] = ['cust1', 'cust2'];
  selectedCustomer!: CustomerDetails;
  customerDetails!: CustomerDetails[];

  constructor(private sharedService: SharedService,
    private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sharedService.get(AppConstants.CUSTOMERS).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.customerDetails = res;
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
      }
    });
  }

  openDialog(element: InventoryItem | undefined | null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderType: 'SO'
    };
    if (element != null && element != undefined) {
      dialogConfig.data = element;
      dialogConfig.data.orderType = 'SO';
    }
    dialogConfig.width = "90%";
    const dialogRef = this.dialog.open(CreateEditOrderDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        let newData = [...this.dataSource.data];
        if (element != null && element != undefined) {
          newData = newData.map(data => {
            if (data.index === element.index) {
              data.item_name = result.item;
              data.category = result.category;
              data.quantity = result.stock;
              data.price = result.price;
            }
            return data;
          });
          this.dataSource.data = newData;
        } else {
          newData.push({
            index: this.currentIndex,
            item_name: result.item,
            category: result.category,
            quantity: result.stock,
            price: result.price
          });
          this.dataSource.data = newData;
          this.currentIndex = this.currentIndex + 1;
          this.recordCount = this.recordCount + 1;
        }
      }
    });
  }

  createOrderOnSubmit() {
    var orderData: Order = {
      orderType: 'SO',
      customer: this.selectedCustomer,
      items: this.dataSource.data
    }
    this.sharedService.post(AppConstants.ORDERS, orderData).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "36%";
        dialogConfig.data = {
          showCancel: false,
          popupTitle: 'Success!! Your order has been created',
          actionText: 'Ok'
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          //TODO: route to my orders page
          this.dataSource.data = [];
        });
      },
      error: (err) => {
        console.log("err: " + JSON.stringify(err));
      }
    });
  }

  editItem(index: number) {
    const editData = this.dataSource.data.filter(val => val.index == index)[0];
    this.openDialog(editData);
  }

  deleteItem(index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "36%";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newData = [...this.dataSource.data];
        var removeIndex = newData.map(function (item) { return item.index; }).indexOf(index);
        newData.splice(removeIndex, 1);
        this.dataSource.data = newData;
        this.recordCount = this.recordCount - 1;
      }
    });
  }

  get isCustomerSelected() {
    return this.selectedCustomer ? true : false;
  }

  addNewCustomer() {
    if (this.selectedCustomer) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "36%";
      dialogConfig.data = {
        popupTitle: 'All your changes will be lost! Do you wish to proceed?',
        actionText: 'Yes',
        cancelText: 'No'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._router.navigateByUrl('/add-customer');
        }
      });
    } else {
      this._router.navigateByUrl('/add-customer');
    }
  }

}
