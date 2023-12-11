import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants, OrderStatus } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { RouteOrdersDialogComponent } from '../route-orders-dialog/route-orders-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'type', 'customer', 'store', 'status', 'created_time'];
  dataSource = new MatTableDataSource();
  private dialogRef;
  private dialogData;

  constructor(public dialog: MatDialog,
    private sharedService: SharedService,
    private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    if (this.isDriver) {
      this.dataSource.data = this.dialogData;
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (!this.isDriver) {
      let userType = localStorage.getItem('role');
      this.sharedService.get(AppConstants.PENDING_ORDERS.replace('{userType}', userType ? userType : '')).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          if (this.isManager) {
            this.displayedColumns = ['orderSelected', 'orderNumber', 'type', 'status', 'created_time'];
          }
          this.dataSource.data = res;
        },
        error: (err) => {
        }
      });
    }
  }

  displayOrderItems(orderElement: any) {
    let currentStatusIndex = OrderStatus.validStatuses.findIndex(status => status == orderElement.status);
    let showTerms = orderElement.status != OrderStatus.deliveryInProgress ? false : true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "90%";
    dialogConfig.data = {
      orderId: orderElement._id,
      orderNumber: orderElement.orderNumber,
      showActionButton: this.isManager ? false : true,
      showTerms: showTerms,
      actionText: 'Confirm - ' + OrderStatus.validStatuses[currentStatusIndex + 1],
      customerDetails: orderElement.customer_name
    };
    const dialogRef = this.dialog.open(OrderItemsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let body = 
          {
            orderId: orderElement._id,
            status: currentStatusIndex + 1,
            acceptedTerm: result.acceptedTerm,
            amountCollected: result.amountCollected,
          totalOrderAmount: result.totalOrderAmount,
          comments: result.comments
          };
        this.sharedService.post(AppConstants.ORDERS_STATUS_CHANGE, body).pipe(
          take(1)
        ).subscribe({
          next: (res) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = "36%";
            dialogConfig.data = {
              showCancel: false,
              popupTitle: 'Success!! Order status had been changed',
              actionText: 'Ok'
            };
            const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
              if (this.isDriver) {
                this.dialogRef?.close();
              }
              this.loadData();
            });
          },
          error: (err) => {
          }
        });
      }
    });
  }

  get isManager() {
    return localStorage.getItem('role') == 'Manager' ? true : false;
  }

  get isDriver() {
    return localStorage.getItem('role') == 'Driver' ? true : false;
  }

  routeOrders() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "95%";
    dialogConfig.data = this.dataSource.data.filter((item:any) => item.orderSelected);
    const dialogRef = this.dialog.open(RouteOrdersDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  get enableRoute() {
    let enableRoute = false;
    this.dataSource.data.forEach((item:any) => {
      if (item.orderSelected) {
        enableRoute = true;
      }
    });
    return enableRoute;
  }

}
