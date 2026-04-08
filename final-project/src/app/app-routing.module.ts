import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import {
  ContactDetailComponent,
} from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'new', component: ContactEditComponent },
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
