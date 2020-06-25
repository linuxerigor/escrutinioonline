import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockChainService } from './block-chain.service';
import { PrincipalComponent } from './principal/principal.component';
import { CriarEscrutinioComponent } from './criar-escrutinio/criar-escrutinio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EscrutinioComponent } from './escrutinio/escrutinio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CriarEscrutinioComponent,
    EscrutinioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [BlockChainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
