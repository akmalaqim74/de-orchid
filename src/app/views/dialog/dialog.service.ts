import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(config: any) {
    return this.dialog.open(DialogComponent, {
      width: config.width || '500px',
      data: { config }
    });
  }
}