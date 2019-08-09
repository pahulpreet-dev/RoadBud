import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuddyComponent } from './buddy/buddy.component';
import { BuddyViewComponent } from './buddy/buddy-view/buddy-view.component';
import { BuddyAddComponent } from './buddy/buddy-add/buddy-add.component';
import { BuddyEditComponent } from './buddy/buddy-edit/buddy-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BuddyComponent,
    BuddyViewComponent,
    BuddyAddComponent,
    BuddyEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
