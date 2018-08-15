import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsContainerComponent } from './alerts-container/alerts-container.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertsContainerComponent, AlertComponent],
  exports: [AlertsContainerComponent],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
