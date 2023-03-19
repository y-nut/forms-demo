import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'reactive-profile-form',
    loadChildren: () =>
      import('./../reactive-profile-form/reactive-profile-form.module').then(
        (m) => m.ReactiveProfileFormModule
      ),
  },
  {
    path: 'reactive-form-example',
    loadComponent: () =>
      import('./../examples/reactive-form-example.component').then(
        (m) => m.ReactiveFormExampleComponent
      ),
  },
  {
    path: 'template-driven-form-example',
    loadComponent: () =>
      import('./../examples/template-driven-form-example.component').then(
        (m) => m.TemplateDrivenFormExampleComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
