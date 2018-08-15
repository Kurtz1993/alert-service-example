import { Component } from '@angular/core';
import { AlertService } from './core/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'alert-service';

  constructor(private alertService: AlertService) {}

  createAlert(): void {
    this.alertService.showAlert({ message: 'hello!!!', type: 'success' });
  }
}
