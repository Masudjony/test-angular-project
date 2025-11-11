import { Component } from '@angular/core';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
// import { RenterService, AuthService, TokenStorageService } from './../../app/services';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-renter',
  standalone: true,
  imports: [Nav, TopHeader,],
  templateUrl: './renter.html',
  styleUrl: './renter.css',
})
export class RenterComponent {}
