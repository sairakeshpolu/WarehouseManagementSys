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
  selector: 'app-routed-or-delivered-orders',
  templateUrl: './routed-or-delivered-orders.component.html',
  styleUrls: ['./routed-or-delivered-orders.component.scss']
})
export class RoutedOrDeliveredComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'type', 'customer', 'store', 'status', 'created_time'];
  dataSource = new MatTableDataSource();
  private dialogRef;
  private dialogData;

  constructor(public dialog: MatDialog,
    private sharedService: SharedService,
    private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    this.dataSource.data = this.dialogData;
  }

  ngOnInit(): void {
    if (this.isPacker) {
      let userType = localStorage.getItem('role');
      this.sharedService.get(AppConstants.ROUTED_OR_DELIVERED_ORDERS.replace('{userType}', userType ? userType : '')).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          this.dataSource.data = res;
        },
        error: (err) => { }
      });
    }
  }

  displayOrderItems(orderElement: any) {
    let statusIndex = OrderStatus.validStatuses.findIndex(status => status == orderElement.status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "90%";
    dialogConfig.data = {
      orderId: orderElement._id,
      orderNumber: orderElement.orderNumber,
      showActionButton: false,
      showTerms: this.isManager ? false : true,
      customerDetails: orderElement.customer_name,
      readOnly: true,
      amountPaidValue: orderElement.amountPaid,
      acceptedTermValue: orderElement.acceptedTerm,
      commentsValue: orderElement.comments,
      statusIndex: statusIndex
    };
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }

  get isManager() {
    return localStorage.getItem('role') == 'Manager' ? true : false;
  }

  get isDriver() {
    return localStorage.getItem('role') == 'Driver' ? true : false;
  }

  get isPacker() {
    return localStorage.getItem('role') == 'Packer' ? true : false;
  }

  routeOrders() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "95%";
    dialogConfig.data = this.dataSource.data.filter((item:any) => item.orderSelected);
    this.dialog.open(RouteOrdersDialogComponent, dialogConfig);
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
