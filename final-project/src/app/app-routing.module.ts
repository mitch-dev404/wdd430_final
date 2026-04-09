import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugsComponent } from './drugs/drugs.component';
import {
  DrugDetailComponent,
} from './drugs/drug-detail/drug-detail.component';
import { DrugEditComponent } from './drugs/drug-edit/drug-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/drugs', pathMatch: 'full' },
  {
    path: 'drugs',
    component: DrugsComponent,
    children: [
      { path: 'new', component: DrugEditComponent },
      { path: ':id', component: DrugDetailComponent },
      { path: ':id/edit', component: DrugEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
