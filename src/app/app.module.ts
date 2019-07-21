import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SetListComponent } from './set-list/set-list.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', component: SetListComponent },
    ])
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SetListComponent,
    FooterComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }


