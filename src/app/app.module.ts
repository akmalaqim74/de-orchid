import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Material Imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

// Component Imports
import { AppComponent } from './app.component';
import { TimesheetComponent } from './views/pages/components/timesheet/timesheet.component';
import { DialogComponent } from './views/dialog/dialog.component';
import { ShareFormModalComponent } from './views/pages/share-form-modal/share-form-modal.component';
import { HomeComponent } from './views/pages/components/home/home.component';
import { HeaderComponent } from './views/pages/components/share-component/header/header.component';
import { PakejModalComponent } from './views/pages/components/share-modal/pakej-modal/pakej-modal.component';
import { HallViewsComponent } from './views/pages/components/home/hall-views/hall-views.component';
import { CateringServiceComponent } from './views/pages/components/home/catering-service/catering-service.component';
import { MainSectionComponent } from './views/pages/components/home/main-section/main-section.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    ShareFormModalComponent,
    DialogComponent,
    HomeComponent,
    HeaderComponent,
    PakejModalComponent,
    HallViewsComponent,
    CateringServiceComponent,
    MainSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }