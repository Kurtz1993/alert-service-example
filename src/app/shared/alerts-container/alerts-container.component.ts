import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  HostBinding,
  ViewRef,
} from '@angular/core';

import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '@app/core/alert.service';
import { Alert } from '@app/shared/models/alert.model';

@Component({
  selector: 'app-alerts-container',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.scss'],
})
export class AlertsContainerComponent implements OnInit {
  @ViewChild('alertsContainer', { read: ViewContainerRef })
  container: ViewContainerRef;
  @HostBinding('class.hidden')
  get isHidden(): boolean {
    return !this.viewRefs.size;
  }

  private factory: ComponentFactory<AlertComponent>;
  private viewRefs: Map<number, ViewRef> = new Map();
  private idCounter = 0;

  constructor(private resolver: ComponentFactoryResolver, private alertService: AlertService) {}

  ngOnInit() {
    this.container.clear();
    this.factory = this.resolver.resolveComponentFactory(AlertComponent);

    this.alertService.alerts$.subscribe(this.createAlert.bind(this));
  }

  createAlert(alert: Alert): void {
    alert.id = this.idCounter++;
    const componentRef: ComponentRef<AlertComponent> = this.container.createComponent(
      this.factory,
      this.viewRefs.size
    );

    componentRef.instance.alertInformation = alert;
    componentRef.instance.close.subscribe(this.deleteAlert.bind(this));
    this.viewRefs.set(alert.id, componentRef.hostView);
  }

  deleteAlert(id: number): void {
    const viewIndex = this.container.indexOf(this.viewRefs.get(id));
    this.container.remove(viewIndex);
    this.viewRefs.delete(id);
  }
}
