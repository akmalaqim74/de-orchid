import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesheetComponent } from './views/pages/components/timesheet/timesheet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogComponent } from './views/dialog/dialog.component';
import { ShareFormModalComponent } from './views/pages/share-form-modal/share-form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    ShareFormModalComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
