
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getStatus,getUser,createTimeSheet,updateTimeSheet } from 'src/app/views/apiService/api';
import { formatDate } from '@angular/common';
import { DialogService } from 'src/app/views/dialog/dialog.service';
import { update } from 'lodash';
interface Timesheet {
  id?: number;
  projectName: string;
  taskName: string;
  from: string;
  to: string;
  userId: number;
  userName: string;
  taskStatusId: number;
}
interface StatusOptions{
  id:number,
  statusName:String
}
interface User{
  id:number,
  name:String,
  email:String
}

@Component({
  selector: 'app-share-form-modal',
  templateUrl: './share-form-modal.component.html',
  styleUrls: ['./share-form-modal.component.scss']
})
export class ShareFormModalComponent {
  timesheetForm: FormGroup;

  statusOptions:StatusOptions[] = [];
  users:User[] =[];
  edit: boolean = false;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShareFormModalComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: Timesheet | null
  ) {
    console.log('ShareFormModalComponent initialized');
    this.timesheetForm = this.fb.group({
      id: [null],
      projectName: ['', Validators.required],
      taskName: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      userId: [null, Validators.required], 
      taskStatusId: [null, Validators.required] 
    });
  }
  
  ngOnInit(): void {
    this.getAllStatus();
    this.getAllUser();
    console.log(this.users);
    if (this.data) {
      this.timesheetForm.patchValue({
        ...this.data
      });
      console.log("data",this.data);
      this.edit=true;
    }
  }

  onSubmit(): void {
    Object.keys(this.timesheetForm.controls).forEach(field => {
      const control = this.timesheetForm.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
    });

    // Trigger validation
    this.timesheetForm.updateValueAndValidity();
    if (this.timesheetForm.valid) {
      const timesheetData = this.timesheetForm.value;
      if(this.edit){
        console.log("Edit TimesheetData",timesheetData);
        updateTimeSheet(timesheetData).then(res => {
          this.dialogService.openDialog({
            title: 'Edited Timesheet',
            description: 'Timesheet Edited',
            successLabel: 'OK',
            showTitle: true,
            showCancelButton: false,
            showIcon: false
          })
        }).catch(err => {
          this.dialogService.openDialog({
            title: 'Uh Oh Something went wrong',
            description: 'Failed to edit Timesheet',
            successLabel: 'OK',
            showTitle: true,
            showCancelButton: false,
            showIcon: false
          });
        });
      }else{
        timesheetData.id = Math.floor(Math.random() * 90000000) + 10000000;
        createTimeSheet(timesheetData).then(res => {
          console.log(res);
          this.dialogService.openDialog({
            title: 'Create Timesheet',
            description: 'Timesheet Created',
            successLabel: 'OK',
            showTitle: true,
            showCancelButton: false,
            showIcon: false
          });
        }).catch(err => {
          this.dialogService.openDialog({
            title: 'Uh Oh Something went wrong',
            description: 'Failed to create Timesheet Created',
            successLabel: 'OK',
            showTitle: true,
            showCancelButton: false,
            showIcon: false
          });
        });
      }
      this.dialogRef.close(timesheetData);
      
    }
  }
  getAllStatus(){
    getStatus().then(res => {
      this.statusOptions = res;
      console.log("response user",res);
    }).catch(err => {
      console.log(err);
    })
  }
  getAllUser(){
    getUser().then(res =>{
      this.users = res;
    }).catch(err => {
      console.log(err);
    })
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.timesheetForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.timesheetForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${this.formatFieldName(fieldName)} is required`;
    }
    return '';
  }

  // Helper to format field names for error messages
  private formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }
}
