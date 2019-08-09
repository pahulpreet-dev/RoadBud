import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuddyComponent } from './buddy/buddy.component';
import { BuddyViewComponent } from './buddy/buddy-view/buddy-view.component';
import { BuddyAddComponent } from './buddy/buddy-add/buddy-add.component';

const routes: Routes = [
  {path: 'buddy', component: BuddyComponent},
  {path: 'buddy/add', component: BuddyAddComponent},
  {path: 'buddy/viewAll', component: BuddyViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
