import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import { CustomerOrdersComponent } from '../customer-orders/customer-orders.component';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {

  displayedColumns: string[] = ['customerName', 'customerType', 'email', 'address', 'contactNumber', 'terms', 'taxId', 'contactPerson'];
  dataSource = new MatTableDataSource();

  constructor(public dialog: MatDialog,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.get(AppConstants.CUSTOMERS).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
      }
    });
  }

  displayOrders(orderElement: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = "99%";
    dialogConfig.width = "99%";
    dialogConfig.data = {
      customerId: orderElement._id,
      customerNameAndStore: orderElement.customer_firstName + ", " + orderElement.customer_lastName + " - " + orderElement.store_name
    };
    this.dialog.open(CustomerOrdersComponent, dialogConfig);
  }

  get isAccountant() {
    return localStorage.getItem('role') == 'Accountant' ? true : false;
  }

  get isManager() {
    return localStorage.getItem('role') == 'Manager' ? true : false;
  }

}
