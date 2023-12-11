import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'type', 'status', 'created_time', 'packer', 'driver', 'orderAmount', 'amountPaid', 'currentDue', 'comments', 'settle'];
  dataSource = new MatTableDataSource();
  customerId!: string;
  customerNameAndStore!: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private changeDetectorRefs: ChangeDetectorRef  ) {
    this.customerNameAndStore = data.customerNameAndStore;
    this.customerId = data.customerId;
  }

  ngOnInit(): void {
    this.sharedService.get(AppConstants.ORDERS + "/" + this.customerId).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        res.forEach((item: any) => {
          item.isLoading = false;
        });
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

  settleOrder(element: any) {
    element.isLoading = true;
    this.sharedService.post(AppConstants.SETTLE_ORDER, element).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        if(res)
          res = JSON.parse(res);
        element.isLoading = false;
        element.settled = res.settled;
        this.changeDetectorRefs.detectChanges();
      },
      error: (err) => {}
    });
  }

}
