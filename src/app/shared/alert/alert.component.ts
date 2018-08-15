import { Component, Output, EventEmitter, Input, HostBinding, OnInit } from '@angular/core';
import { Alert } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input()
  alertInformation: Alert;
  @Output()
  close = new EventEmitter<number>();
  @HostBinding('class')
  componentClasses: string;

  ngOnInit() {
    this.componentClasses = `alert alert--${this.alertInformation.type}`;
  }

  closeAlert() {
    this.close.emit(this.alertInformation.id);
  }
}
