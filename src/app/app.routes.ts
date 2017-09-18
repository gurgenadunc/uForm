import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ManageFormsComponent } from './manage-forms/manage-forms.component';
import { ResponsesComponent } from './responses/responses.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from 'app/user/auth-guard.service';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'admin', canActivate: [ AuthGuard], component: AdminPanelComponent },
    { path: 'create-form', canActivate: [ AuthGuard], component: CreateFormComponent },
    { path: 'manage-forms', canActivate: [ AuthGuard], component: ManageFormsComponent },
    { path: 'responses', canActivate: [ AuthGuard], component: ResponsesComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const appRouterModule = RouterModule.forRoot(routes);
