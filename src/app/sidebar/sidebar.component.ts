import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  countryList = [];

  constructor(private dashBoardService : DashBoardService) { }

  ngOnInit() {
    this.countryList = this.dashBoardService.getAllCountryList();
  }

}
