import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants, OrderStatus } from '../../model/app-constants';
import { InventoryItem, Order } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'askedStock', 'price'];
  dataSource = new MatTableDataSource<InventoryItem>();
  orderId!: string;
  orderNumber!: string;
  actionText!: string;
  showActionButton: boolean = false;
  terms: String[] = ["COD Cheque", "COD Cash", "B To B"];
  acceptedTerm!: number;
  showTerms: boolean = false;
  showError: boolean = false;
  amountCollected: number = 0;
  previousDue: number = 0;
  comments!: string;
  readOnly: boolean = false;
  amountPaidValue!: string;
  acceptedTermValue!: string;
  commentsValue!: string;
  statusIndex: number = 0;

  constructor(public dialogRef: MatDialogRef<OrderItemsComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.orderId = data.orderId;
    this.orderNumber = data.orderNumber;
    this.actionText = data.actionText ? data.actionText : '';
    this.showActionButton = data.showActionButton ? data.showActionButton : false;
    this.showTerms = data.showTerms ? data.showTerms : false;
    this.readOnly = data.readOnly;
    this.amountPaidValue = data.amountPaidValue;
    this.acceptedTermValue = data.acceptedTermValue;
    this.commentsValue = data.commentsValue;
    this.statusIndex = data.statusIndex;
    if (this.isPacker) {
      this.displayedColumns = ['id', 'name', 'type', 'askedStock', 'packedStock', 'availableStock', 'price'];
    }

    this.sharedService.get(AppConstants.ORDER_ITEMS.replace(':orderId', this.orderId)).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
      }
    });

    if (this.isDriver) {
      this.sharedService.get(AppConstants.PENDING_DUE.replace(':customerId', data.customerDetails._id)).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          this.previousDue = res.previousDue;
        },
        error: (err) => {
        }
      });
    }
  }

  ngOnInit(): void {

  }

  get totalPrice() {
    if (this.isSalesPerson)
      return this.dataSource.data.map(t => {
        if (t.askedQuantity)
          return (t.price * t.askedQuantity);
        return 0;
      }).reduce((acc, value) => acc + value, 0);
    return this.dataSource.data.map(t => (t.price * t.quantity)).reduce((acc, value) => acc + value, 0);
  }

  confirmAction() {
    if (this.showTerms && this.acceptedTerm!=undefined && this.amountCollected>=0) {
      this.dialogRef.close({
        result: true,
        acceptedTerm: this.acceptedTerm,
        amountCollected: this.amountCollected,
        totalOrderAmount: this.totalPrice,
        comments: this.comments
      });
    }
    else if (this.showTerms && (this.acceptedTerm == undefined || this.amountCollected == undefined || this.amountCollected < 0)) {
      this.showError = true;
    }
    else if (!this.showTerms) {
      if (this.isPacker && this.isOrderPackStart(this.dataSource.data[0])) {
        let packQtyErrorExists = false;
        this.dataSource.data.forEach(item => {
          if (!item.quantity || item.quantity <= 0)
            packQtyErrorExists = true;
          if (item.askedQuantity && item.quantity > item.askedQuantity)
            packQtyErrorExists = true;
          if (item.availableQuantity && item.quantity > item.availableQuantity)
            packQtyErrorExists = true;
        });

        if (!packQtyErrorExists) {
          let body = {
            orderId: this.orderId,
            items: this.dataSource.data
          }
          this.sharedService.post(AppConstants.PACK_ORDER, body).pipe(
            take(1)
          ).subscribe({
            next: (res) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
            }
          });
        }
      } else {
        this.dialogRef.close(true);
      }
    }
  }

  get isPacker() {
    return localStorage.getItem('role') == 'Packer' ? true : false;
  }

  get isSalesPerson() {
    return localStorage.getItem('role') == 'SalesPerson' ? true : false;
  }

  get isDriver() {
    return localStorage.getItem('role') == 'Driver' ? true : false;
  }

  get isManagerAndOrderRouted() {
    return localStorage.getItem('role') == 'Manager' ? this.statusIndex >= 3 ? true : false : false;
  }

  get isDriverAndOrderDelivered() {
    return this.isDriver && this.showTerms;
  }

  get isDriverAndOrderDeliveryCompleted() {
    return this.isDriver && this.statusIndex>=5;
  }

  isOrderPackStart(element: InventoryItem) {
    return element.orderStatus == OrderStatus.orderCreated;
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas: any) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('invoice.pdf');
    });
  }

}
