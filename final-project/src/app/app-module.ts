import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { HeaderComponent } from './header.component';
import { DrugsComponent } from './drugs/drugs.component';
import { DrugListComponent } from './drugs/drug-list/drug-list.component';
import { DrugDetailComponent } from './drugs/drug-detail/drug-detail.component';
import { DrugItemComponent } from './drugs/drug-list/drug-item/drug-item.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DrugEditComponent } from './drugs/drug-edit/drug-edit.component';
import { FormsModule } from '@angular/forms';
import { DrugsFilterPipe } from './drugs/drugs-filter-pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    DrugsComponent,
    DrugListComponent,
    DrugDetailComponent,
    DrugItemComponent,
    DropdownDirective,
    DrugEditComponent,
    DrugsFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
