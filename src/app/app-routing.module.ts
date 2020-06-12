import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { TestComponent } from './test/test.component';


const routes:Routes = [
  { path: 'test', component: TestComponent}
];

@NgModule({
  //declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
   exports:[RouterModule]
})
export class AppRoutingModule { }
