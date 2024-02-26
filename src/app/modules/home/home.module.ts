import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@sharedModule/shared.module';
// import { DirectivesModule } from '@common/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, 
    MatIconModule,
    RouterModule.forChild(HOME_ROUTES),
    SharedModule,
    NgbModule,
    // DirectivesModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
