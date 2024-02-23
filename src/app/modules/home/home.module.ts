import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule { }
