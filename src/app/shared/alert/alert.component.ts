import { Component, Output, EventEmitter, Input, HostBinding, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AlertConfig } from '../models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input()
  config: AlertConfig;
  @Output()
  close = new EventEmitter<number>();
  @HostBinding('class')
  componentClasses: string;

  get animationDuration(): string {
    return `${this.config.timeout}ms`;
  }

  ngOnInit() {
    this.componentClasses = `alert alert--${this.config.type}`;

    if (this.config.timeout) {
      timer(this.config.timeout).subscribe(null, null, () => {
        this.closeAlert();
      });
    }
  }

  closeAlert() {
    this.componentClasses += ' alert--closing';
    timer(500).subscribe(() => {}, null, () => {
      this.close.emit(this.config.id);
    });
  }
}
