import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  popupTitle: string = 'Are you sure you want to delete?';
  actionText: string = 'Delete';
  cancelText: string = 'Cancel';
  showCancel: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    if (data && data.popupTitle) {
      this.popupTitle = data.popupTitle;
      this.actionText = data.actionText ? data.actionText : 'Clear';
    }
    if (data && data.showCancel == false) {
      this.showCancel = false;
    }
    if (data && data.cancelText) {
      this.cancelText = data.cancelText;
    }
  }
}
