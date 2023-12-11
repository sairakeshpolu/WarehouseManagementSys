import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'type', 'customer', 'store', 'created_time'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.get(AppConstants.ORDERS).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
      }
    });
  }

  displayOrderItems(orderElement: any) {
    console.log("Click");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "90%";
    dialogConfig.data = {
      orderId: orderElement._id,
      orderNumber: orderElement.orderNumber,
    };
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }

}
