import { Component } from '@angular/core';
import {HomeComponent} from './home/home.component'
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `<section>
    <router-outlet></router-outlet>
  </section>`,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent,RouterModule]
})
export class AppComponent {
  title = 'first project with angular';
}
