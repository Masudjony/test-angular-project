import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';
import { NgFor, NgIf } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

// import { AuthService, HouseService, RenterService, TokenStorageService } from './../core/services';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, Nav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
