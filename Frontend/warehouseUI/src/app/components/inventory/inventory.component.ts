import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AppConstants } from '../../model/app-constants';
import { InventoryItem } from '../../model/item-details';
import { SharedService } from '../../service/shared.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'stock', 'price'];
  dataSource = new MatTableDataSource<InventoryItem>();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.get(AppConstants.INVENTORY_ITEMS).pipe(
      take(1)
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => {
      }
    });
  }

}
