import { Injectable } from '@angular/core';

import { Subject, Observable, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { Alert } from '../shared/models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts$: Observable<Alert>;

  private defaultConfig: Alert;
  private alertsSubject: Subject<Alert>;

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

  showAlert(config: Alert): void {
    const alert = Object.assign({}, this.defaultConfig, config);
    this.alertsSubject.next(alert);
  }
}
