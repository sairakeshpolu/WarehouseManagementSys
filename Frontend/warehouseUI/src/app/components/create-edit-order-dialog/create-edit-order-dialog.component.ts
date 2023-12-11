import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-create-edit-order-dialog',
  templateUrl: './create-edit-order-dialog.component.html',
  styleUrls: ['./create-edit-order-dialog.component.scss']
})
export class CreateEditOrderDialogComponent implements OnInit {

  item: string = '';
  category!: string;
  stock: number = 1;
  price: number = 0;
  orderType: string = 'PO';
  inventoryItems!: InventoryItem[];
  selectedItem!: InventoryItem;
  actionText: string = 'Add';
  
  constructor(
    public dialogRef: MatDialogRef<CreateEditOrderDialogComponent>,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: any) {
    if (data != null && data != undefined) {
      this.item = data.item_name;
      this.category = data.category;
      this.stock = data.quantity ? data.quantity : 1;
      this.price = data.price ? data.price : 0;
      this.actionText = data.item_name ? 'Edit' : 'Add';
    }
    this.orderType = (data && data.orderType) ? data.orderType : this.orderType;
  }

  type: String[] = ["Beverages", "Botanicals", "Health & Beauty", "Household products", "Personal & HealthCare", "Store supplies"]; 

  ngOnInit() {
    if (this.orderType == 'SO') {
      this.sharedService.get(AppConstants.INVENTORY_ITEMS).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          this.inventoryItems = res;
          if (this.item) {
            this.selectedItem = this.inventoryItems.filter(item => item.item_name == this.item
              && item.category == this.category)[0];
          }
        },
        error: (err) => {
          console.log("err: " + JSON.stringify(err));
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  get formValid() {
    if (this.orderType == 'PO' && this.item && this.category && this.stock > 0 && this.price >= 0) {
      return true;
    } else if (this.orderType == 'SO' && this.selectedItem && this.stock > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(): void {
    if (this.orderType == 'PO') {
      this.dialogRef.close(
        {
          item: this.item,
          category: this.category,
          stock: this.stock,
          price: this.price
        }
      );
    } else {
      this.dialogRef.close(
        {
          item: this.selectedItem.item_name,
          category: this.selectedItem.category,
          stock: this.stock,
          price: this.pricePerEachQty
        }
      );
    }
  }

  itemChangeListener() {
    this.stock = 1;
  }

  get availableStock() {
    return this.selectedItem ? this.selectedItem.quantity : 0;
  }

  get pricePerEachQty() {
    return this.selectedItem ? this.selectedItem.price : 0;
  }

  get totalPrice() {
    return this.selectedItem ? (this.selectedItem.price * this.stock) : 0;
  }

  get itemSelected() {
    return this.selectedItem ? true : false;
  }

  get maxQtyValue() {
    return this.selectedItem ? this.selectedItem.quantity : 0;
  }
}
  
