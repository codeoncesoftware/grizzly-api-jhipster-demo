import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { JhipsterSampleApplicationAppModule } from 'app/app.module';
import { ProdConfig } from 'app/blocks/config/prod.config';


ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(JhipsterSampleApplicationAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Application started'))
  .catch(err => console.error(err));
