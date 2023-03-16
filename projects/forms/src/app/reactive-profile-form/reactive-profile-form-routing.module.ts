import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveProfileFormComponent } from './reactive-profile-form.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveProfileFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveProfileFormRoutingModule {}
