import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem, Order } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { CreateEditOrderDialogComponent } from '../create-edit-order-dialog/create-edit-order-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'stock', 'price', 'actions'];
  dataSource = new MatTableDataSource<InventoryItem>();
  currentIndex: number = 0;
  recordCount: number = 0;

  constructor(private sharedService: SharedService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(element: InventoryItem | undefined | null) {
    const dialogConfig = new MatDialogConfig();
    if (element != null && element != undefined) {
      dialogConfig.data = element;
    }
    dialogConfig.width = "90%";
    const dialogRef = this.dialog.open(CreateEditOrderDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        if (this.itemAlreadyExists(this.dataSource.data, result.item, result.category)) {
          this.sharedService.displayMessage("You cannot add an item that is already added to the list", 'green-snackbar');
          return;
        }
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

  itemAlreadyExists(existingData: any, itemName: string, category: string) {
    return existingData.findIndex((element: any) =>
      itemName == element.item_name && category == element.category
    ) != -1 ? true : false;
  }

  createOrderOnSubmit() {
    var orderData: Order = {
      orderType: 'PO',
      customer: null,
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

}
