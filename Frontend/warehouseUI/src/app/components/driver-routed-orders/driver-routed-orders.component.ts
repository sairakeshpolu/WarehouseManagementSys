import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { SharedService } from '../../service/shared.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { PendingOrdersComponent } from '../pending-orders/pending-orders.component';


@Component({
  selector: 'app-driver-routed-orders',
  templateUrl: './driver-routed-orders.component.html',
  styleUrls: ['./driver-routed-orders.component.scss']
})
export class DriverRoutedOrdersComponent implements OnInit {

  displayedColumns: string[] = ['routeOrder', 'count'];
  dataSource = new MatTableDataSource();
  totalResponse: any;

  constructor(public dialog: MatDialog,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let userType = localStorage.getItem('role');
    this.sharedService.get(AppConstants.PENDING_ORDERS.replace('{userType}', userType ? userType : '')).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.totalResponse = res;

        const orderCountMap = new Map<number, number>();

        this.totalResponse.forEach((obj: any) => {
          const routeOrder = obj.routeOrder;
          orderCountMap.set(routeOrder, (orderCountMap.get(routeOrder) || 0) + 1);
        });

        this.dataSource.data = Array.from(orderCountMap).map(([routeOrder, count]) => ({ routeOrder, count }));
      },
      error: (err) => { }
    });
  }

  displayRouteOrders(orderElement: any) {
    let orderData = this.totalResponse.filter((order: any) => order.routeOrder == orderElement.routeOrder);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "90%";
    dialogConfig.data = orderData;
    const dialogRef = this.dialog.open(PendingOrdersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

}
