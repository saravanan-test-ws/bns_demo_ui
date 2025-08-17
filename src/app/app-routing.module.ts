import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/add', component: UserFormComponent },
    { path: 'users/edit/:id', component: UserFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
