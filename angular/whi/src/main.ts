import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ViewPort } from './app/viewPort.component';

bootstrapApplication(ViewPort, appConfig)
  .catch((err) => console.error(err));
