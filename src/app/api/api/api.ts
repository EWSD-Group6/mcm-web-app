export * from './articles.service';
import { ArticlesService } from './articles.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './comments.service';
import { CommentsService } from './comments.service';
export * from './contributeSessions.service';
import { ContributeSessionsService } from './contributeSessions.service';
export * from './contributions.service';
import { ContributionsService } from './contributions.service';
export * from './faculties.service';
import { FacultiesService } from './faculties.service';
export * from './storage.service';
import { StorageService } from './storage.service';
export * from './systemData.service';
import { SystemDataService } from './systemData.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [ArticlesService, AuthService, CommentsService, ContributeSessionsService, ContributionsService, FacultiesService, StorageService, SystemDataService, UsersService];
