import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Menu, sidebarMenu } from '../../model/app-constants';
import { SharedService } from '../../service/shared.service';


@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService,
              private _router: Router,
              private sharedService: SharedService) { }

  routerActive: string = "activelink";

  ngOnInit() {
    this.sharedService.isAllowedToVisitPage();
  }

  logout() {
    this.authenticationService.logout();
  }

  get role() {
    return localStorage.getItem('role');
  }

  get nameOfLoggedUser() {
    return localStorage.getItem('nameOfUser');
  }

  get sidebarMenuForUser() {
    var sidebarMenu: sidebarMenu[] = [];
    this.sidebarMenu.forEach(element => {
      if (element.supportedRoles.indexOf(this.role != null ? this.role : 'N/A') != -1) {
        sidebarMenu.push(element);
      }
    });
    return sidebarMenu;
  }

  sidebarMenu: sidebarMenu[] = Menu.sidebarMenu;

}
