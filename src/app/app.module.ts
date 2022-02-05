
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FieldsetModule} from 'primeng/fieldset';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {InputTextModule} from 'primeng/inputtext';
import { ReviewDialogComponent } from './assets/Components/review-dialog/review-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    ReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FieldsetModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
