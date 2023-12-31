import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//CUSTOM ERROR HANDLING
import {CustomErrorHandlerService} from './services/custom-error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// QR CODE SCANNING
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// QR CODE READER
import { ReadQrComponentComponent } from "./components/read-qr-component/read-qr-component.component";
//QR CODE GENERATION
import { QRCodeModule } from 'angularx-qrcode';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ChangeLogsComponent } from './components/change-logs/change-logs.component';
import { ReportLogsComponent } from './components/report-logs/report-logs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './router-guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FilterPipe } from './filter.pipe';
import { RegisterComponent } from './components/register/register.component';
import { ImportCsvButtonComponent } from './components/import-csv-button/import-csv-button.component';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { DataAnalysisComponent } from './components/data-analysis/data-analysis.component';
import { LoggingService } from './services/logging.service';
import { ExportButtonChangeLogsComponent } from './components/export-button-change-logs/export-button-change-logs.component';
import { NgChartsModule } from 'ng2-charts';

import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { DiplomaComponent } from './components/diploma/diploma.component';
import { DiplomaTemplateComponent } from './components/diploma-template/diploma-template.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ExportButtonPdfComponent } from './components/export-button-pdf/export-button-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    ChangeLogsComponent,
    ReportLogsComponent,
    DashboardComponent,
    LoginComponent,
    ManageAccountComponent,
    ForgetPasswordComponent,
    ScanQrComponent,
    NavbarComponent,
    FilterPipe,
    RegisterComponent,
    ReadQrComponentComponent,
    ImportCsvButtonComponent,
    ExportButtonComponent,
    DataAnalysisComponent,
    ExportButtonChangeLogsComponent,
    EditFormComponent,
    PagenotfoundComponent,
    ProgressbarComponent,
    DiplomaComponent,
    DiplomaTemplateComponent,
    SpinnersComponent,
    DeleteButtonComponent,
    ModalPopupComponent,
    ExportButtonPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgChartsModule
  ],

  providers: [AuthGuard, FilterPipe, LoggingService,
    {provide:ErrorHandler, useClass:CustomErrorHandlerService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
