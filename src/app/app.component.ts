import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from "./sign-in/sign-in";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
