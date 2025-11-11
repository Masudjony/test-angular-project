import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-house',
  imports: [Nav,TopHeader],
  templateUrl: './house.html',
  styleUrl: './house.css',
})
export class House {

}
