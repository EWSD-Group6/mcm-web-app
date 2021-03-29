import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {ContainerComponent} from './container/container.component';
import {httpInterceptorProviders} from './core/interceptors';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {ApiModule, Configuration} from './api';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzGridModule} from 'ng-zorro-antd/grid';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
    imports: [
        BrowserModule,
        CoreModule,
        AuthModule,
      ApiModule.forRoot(() => {
        const config = new Configuration();
        config.basePath = environment.baseApi;
        config.credentials.ApiKeyAuth = `default`;
        return config;
      }),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzPageHeaderModule,
        NzBreadCrumbModule,
        NzDropDownModule,
        NzAvatarModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        NzGridModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    ...httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
