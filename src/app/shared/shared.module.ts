import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAllModule } from './modules/material-all.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialAllModule
  ],
  exports: [MaterialAllModule]
})
export class SharedModule { }
