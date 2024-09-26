import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routesconfig from './app/routes';

bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(routesconfig)
  ]
})
  .catch(err => console.error(err));
