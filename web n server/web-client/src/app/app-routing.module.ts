import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuddyComponent } from './buddy/buddy.component';
import { BuddyViewComponent } from './buddy/buddy-view/buddy-view.component';
import { BuddyAddComponent } from './buddy/buddy-add/buddy-add.component';
import { BuddyEditComponent } from './buddy/buddy-edit/buddy-edit.component';
import { BuddyDeleteComponent } from './buddy/buddy-delete/buddy-delete.component';

const routes: Routes = [
  {path: 'buddy', component: BuddyComponent},
  {path: 'buddy/add', component: BuddyAddComponent},
  {path: 'buddy/viewAll', component: BuddyViewComponent},
  {path: 'buddy/edit/:id', component: BuddyEditComponent},
  {path: 'buddy/delete/:id', component: BuddyDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
