import { Router, ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { tap, filter } from 'rxjs/operators';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = '';
  showMenuSidebar = false;
  userType = '';
  landingRoute = '/dashboard';
  constructor(private appSvc: ApplicationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.landingRoute = '/dashboard';
    if (this.router.url !== this.landingRoute) {
      this.router.navigateByUrl(this.landingRoute);
    }

    this.showMenuSidebar = this.router.url !== this.landingRoute;
    this.title = this.activatedRoute.firstChild.snapshot.data['title'];
    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd)
    ).subscribe((event: ChildActivationEnd) => {
      this.title = event.snapshot.firstChild.data['title'] || this.title;
    });
  }

  toggleSetting() {
    this.showMenuSidebar = !this.showMenuSidebar;
    if (this.showMenuSidebar && this.router.url === this.landingRoute) {
      this.router.navigateByUrl('/dashboard');
    } else if (!this.showMenuSidebar && this.router.url !== this.landingRoute) {
      this.router.navigateByUrl(this.landingRoute);
    }
  }
}
