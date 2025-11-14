import { Component } from '@angular/core';
import { RenterListComponent } from './renter-list/renter-list.component';
import { CommonModule } from '@angular/common';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';
import { AssignFlatComponent } from './assign-flat/assign-flat.component';

@Component({
  selector: 'app-renter',  // ❌ আগে ছিল app-renter-list — conflict fix
  standalone: true,
  imports: [CommonModule, Nav, TopHeader, RenterListComponent, AssignFlatComponent],
  templateUrl: './renter.html',
  styleUrls: ['./renter.css'],
})
export class RenterComponent {
  activeTab: string = 'RenterList';

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
