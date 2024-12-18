import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';
import { ShareFormModalComponent } from '../../share-form-modal/share-form-modal.component';
import { getTimeSheets,deleteTimeSheet } from 'src/app/views/apiService/api';
import { DialogService } from 'src/app/views/dialog/dialog.service';

interface Timesheet {
  id: number;
  projectName: string;
  taskName: string;
  from: string;
  to: string;
  taskStatusId: number;
  userId: number;
  userName: string;
  statusName: string;
}
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent {
  
  timesheets: Timesheet[] = [];
  private timesheetSubject = new BehaviorSubject<Timesheet[]>([]);
  searchCriteria: string = '';
  sortColumn: string = 'date_from';
  sortDirection:string = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalRecords: number = 0;
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadTimesheets();
  }
  loadTimesheets(): void {
    getTimeSheets('')
    .then(response => {
      this.timesheets = response;
    }).catch(error => {
      this.dialogService.openDialog({
        title: 'Uh Oh Something went wrong',
        successLabel: 'OK',
        showTitle: true,
        showCancelButton: false,
        showDescription:false,
        showIcon: false
      });
    });
  }
  toggleSort():void{
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.search();
  }

  search(): void {
    getTimeSheets(this.searchCriteria, this.sortColumn, this.sortDirection)
    .then(response => {
      this.timesheets = response;
    }).catch(error => {
      this.dialogService.openDialog({
        title: 'Uh Oh Something went wrong',
        successLabel: 'OK',
        showTitle: true,
        showCancelButton: false,
        showDescription:false,
        showIcon: false
      });
    });
  }
  openCreateModal(): void {
    const dialogRef = this.dialog.open(ShareFormModalComponent, {
      width: '800px',
      data: null 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.search();
      }
    });
  }

  editTimesheet(id: number): void {
    const timesheet = this.timesheets.find(ts => ts.id === id);
    const dialogRef = this.dialog.open(ShareFormModalComponent, {
      width: '800px',
      data: { ...timesheet }  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search();
      }
    });
  }

  deleteTimesheet(id: number): void {
    const deleteConfirmDialog = this.dialogService.openDialog({
      title: 'Delete Timesheet',
      description: 'Are you sure you want to delete this task?',
      successLabel: 'Delete',
      cancelLabel: 'Cancel',
      imgIcon: 'assets/icons/delete-icon.svg',
      showTitle: true,
      showIcon: false
    });
  
    deleteConfirmDialog.afterClosed().subscribe(result => {
      if (result) {
        deleteTimeSheet(id)
          .then(() => {
            const deleteSuccessDialog = this.dialogService.openDialog({
              title: 'Task Deleted',
              description: 'Successful',
              successLabel: 'OK',
              imgIcon: 'assets/icons/delete-icon.svg',
              showCancelButton: false,
              showTitle: true,
              showIcon: false
            });
            deleteSuccessDialog.afterClosed().subscribe(result => 
              {
                this.loadTimesheets();
              });
            
            
          })
          .catch(error => {
            console.error('Error deleting timesheet:', error);
            this.dialogService.openDialog({
              title: 'Uh Oh Something went wrong',
              successLabel: 'OK',
              showTitle: true,
              showCancelButton: false,
              showDescription:false,
              showIcon: false
            });
          });
      }
    });
  }
}
