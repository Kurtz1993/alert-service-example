import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertContainerComponent } from './alert-container/alert-container.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertContainerComponent, AlertComponent],
  exports: [AlertContainerComponent],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
