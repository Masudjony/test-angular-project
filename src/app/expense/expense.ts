import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-expense',
  imports: [Nav, TopHeader],
  templateUrl: './expense.html',
  styleUrl: './expense.css',
})
export class Expense {

}
