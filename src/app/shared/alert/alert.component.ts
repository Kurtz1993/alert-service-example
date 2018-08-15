import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Alert } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input()
  alertInformation: Alert;

  @Output()
  close = new EventEmitter<number>();

  closeAlert() {
    this.close.emit(this.alertInformation.id);
  }
}
