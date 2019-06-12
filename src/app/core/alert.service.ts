import { Injectable } from '@angular/core';

import { Subject, Observable, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { AlertConfig } from '../shared/models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts$: Observable<AlertConfig>;

  private defaultConfig: AlertConfig;
  private alertsSubject: Subject<AlertConfig>;

  constructor() {
    this.alertsSubject = new Subject();
    this.alerts$ = this.alertsSubject.asObservable().pipe(observeOn(queueScheduler));
    this.defaultConfig = {
      message: '',
      type: 'success',
      closable: true,
      timeout: 5000,
    };
  }

  showAlert(config: AlertConfig): void {
    const alert = Object.assign({}, this.defaultConfig, config);
    this.alertsSubject.next(alert);
  }
}
