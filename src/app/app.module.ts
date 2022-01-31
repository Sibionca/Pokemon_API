import { MatSliderModule } from '@angular/material/slider';
import { PokemonService } from './services/pokemon.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ListaPokemonComponent } from './lista-pokemon/lista-pokemon.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { DialogComponent } from './lista-pokemon/dialog/dialog.component';
import { FormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaPokemonComponent,
    PokemonsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    PokemonService,
    HttpClientModule,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
