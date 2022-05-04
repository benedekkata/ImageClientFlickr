import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { ImageGridItemComponent } from './components/image-grid/image-grid-item/image-grid-item.component';
import { UserImagesComponent } from './components/user-images/user-images.component';
@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    ImageGridComponent,
    ImageGridItemComponent,
    UserImagesComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    AppRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatChipsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
