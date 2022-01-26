import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Models/Pokemon';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.css']
})
export class ListaPokemonComponent {
  public pokemons: Pokemon[]; 
  public pokemonsid: number;
  public pokemonNome: string;
  public compararPokemons: boolean = false;
  

  constructor( 
    public pokemonService: PokemonService,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    //PUXA A LISTA DE POKEMONS DO 0 - 151
    this.pokemonService.getPokemons().subscribe(
      data => {
        this.pokemons = data.results;
        //GUARDA OS RESULTADOS NUM ARRAY POKEMON[]
        //O FOR ABAIXO PERCORRE O ARRAY ITEM A ITEM PARA MUDAR O NOME COLOCANDO LETRA MAIUSCULA NO NOME DO POKEMON 
        //E ADICIONA "00" ou "0" DE ACORDO COM O NUMERO DELE
        for ( let i = 0; i <= 151; i++){
          if(this.pokemons[i] != undefined && this.pokemons[i].name != undefined){
            this.pokemons[i].name = this.pokemons[i].name[0].toUpperCase() + this.pokemons[i].name.slice(1);
            if(i<=8){
              this.pokemons[i].number = "00" + (i+1);
            } else if(i<=98){
              this.pokemons[i].number = "0" + (i+1);
            } else {
              this.pokemons[i].number = "" + (i+1);
            }
          }
          
        }                  
      }      
    )
  }


  //PUXA O ID DO POKEMON NA LISTA E ABRE O DIALOG COM O POKEMON ESPECIFICO
  abrirStats(id:number){
    this.pokemonService.pokemonSelecionado = id;
    const dialogRef = this.dialog.open(DialogComponent);
    //dialogRef.componentInstance.pokemonId = id;
  }

  //PUXA O POKEMON ATRAVÉS DO NOME NO INPUT
  buscar(){
    console.log(this.pokemonNome);
  }

  //ABRE O CONTAINER DE COMPARAÇÃO DE POKEMON 
  CompararPokemons(){
    this.compararPokemons = true;
  }
  //FECHA O CONTAINER DE COMPARAÇÃO DE POKEMON 
  FecharComparar(){
    this.compararPokemons = false;
  }
}

