import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../service/shared.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RouteOrder } from '../../model/item-details';
import { AppConstants } from '../../model/app-constants';
import { take } from 'rxjs';


@Component({
  selector: 'app-route-orders-dialog',
  templateUrl: './route-orders-dialog.component.html',
  styleUrls: ['./route-orders-dialog.component.scss']
})
export class RouteOrdersDialogComponent implements OnInit {

  @ViewChild('table') table!: MatTable<RouteOrder>;
  displayedColumns: string[] = ['orderSelected', 'orderNumber', 'type', 'status', 'created_time'];
  dataSource!: RouteOrder[];
  dragDisabled = true;

  constructor(public dialogRef: MatDialogRef<RouteOrdersDialogComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.dataSource = data;
  }

  ngOnInit(): void {

  }

  get isPacker() {
    return localStorage.getItem('role') == 'Packer' ? true : false;
  }

  get isSalesPerson() {
    return localStorage.getItem('role') == 'SalesPerson' ? true : false;
  }

  dropTable(event: CdkDragDrop<RouteOrder[]>) {
    this.dragDisabled = true;
    const previousIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  routeConfirm() {
    this.sharedService.post(AppConstants.ROUTE_ORDER, this.dataSource).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
      }
    });
  }
}
