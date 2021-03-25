import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ArticlesService } from './api/articles.service';
import { AuthService } from './api/auth.service';
import { CommentsService } from './api/comments.service';
import { ContributeSessionsService } from './api/contributeSessions.service';
import { ContributionsService } from './api/contributions.service';
import { FacultiesService } from './api/faculties.service';
import { StorageService } from './api/storage.service';
import { SystemDataService } from './api/systemData.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ArticlesService,
    AuthService,
    CommentsService,
    ContributeSessionsService,
    ContributionsService,
    FacultiesService,
    StorageService,
    SystemDataService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
