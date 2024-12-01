import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  [key: string]: any;
  config: any = {};
  title: string = 'Confirmation';
  description: string = 'Are you sure you want to proceed?';
  imgIcon: string = 'assets/icons/question.svg';
  iconClass: string = 'confirmation-icon';
  cancelLabel: string = 'Cancel';
  successLabel: string = 'Confirm';
  showDescription: boolean = true;
  showCancelButton: boolean = true;
  showSubmitButton: boolean = true;
  showTitle: boolean = true;
  showIcon: boolean = true;
  dialogType: 'confirm' | 'alert' | 'success' = 'confirm';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.config = this.data.config;
    if (!_.isEmpty(this.config)) {
      for (let key in this.config) {
        if (typeof this.config[key] === 'string' && !_.isEmpty(this.config[key])) {
          this[key] = this.config[key];
        } else if (typeof this.config[key] === 'boolean') {
          this[key] = this.config[key];
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}