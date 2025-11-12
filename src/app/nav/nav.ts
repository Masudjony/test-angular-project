import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isLoading = false;

  onButtonClick(): void {
    this.isLoading = true;
    console.log('Navigating to renter list...');
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
