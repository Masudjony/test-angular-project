import { Component } from '@angular/core';
import { Nav } from "../nav/nav";
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-payment',
  imports: [Nav, TopHeader],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

}
