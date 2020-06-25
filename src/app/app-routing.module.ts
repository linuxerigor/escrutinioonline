import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CriarEscrutinioComponent } from './criar-escrutinio/criar-escrutinio.component';
import { EscrutinioComponent } from './escrutinio/escrutinio.component';


const routes: Routes = [
  {path: 'principal',  component: PrincipalComponent},
  {path: 'criar',  component: CriarEscrutinioComponent},
  {path: 'escrutinio/:id',  component: EscrutinioComponent},
  {path: '', redirectTo: '/principal', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
