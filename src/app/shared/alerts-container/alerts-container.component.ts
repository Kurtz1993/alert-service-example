import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  HostBinding,
} from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../core/alert.service';
import { Alert } from 'src/app/shared/models/alert.model';

@Component({
  selector: 'app-alerts-container',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss'],
})
export class AlertsContainerComponent implements OnInit {
  @ViewChild('alertsContainer', { read: ViewContainerRef })
  container: ViewContainerRef;
  currentAlerts: Alert[] = [];

  @HostBinding('class.hidden')
  get isHidden(): boolean {
    return !this.currentAlerts.length;
  }

  private factory: ComponentFactory<AlertComponent>;

  constructor(private resolver: ComponentFactoryResolver, private alertService: AlertService) {}

  ngOnInit() {
    this.container.clear();
    this.factory = this.resolver.resolveComponentFactory(AlertComponent);

    this.alertService.alerts$.subscribe(this.createAlert.bind(this));
  }

  createAlert(alert: Alert): void {
    this.currentAlerts = [...this.currentAlerts, alert];
    const alertId = this.currentAlerts.length - 1;
    const componentRef: ComponentRef<AlertComponent> = this.container.createComponent(
      this.factory,
      alert ? alertId : 0
    );

    componentRef.instance.alertInformation = alert;
    componentRef.instance.id = alertId;
    componentRef.instance.close.subscribe(this.deleteAlert.bind(this));
  }

  deleteAlert(id: number): void {
    this.container.remove(id);
  }
}