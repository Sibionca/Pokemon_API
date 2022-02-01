import { PokemonAPI } from './../Models/PokemonAPI';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Models/Pokemon';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.css']
})
export class ListaPokemonComponent {
  public pokemons: Pokemon[]; 
  public pokemonsid: number;
  public pokemonInput: any;
  public compararPokemons: boolean = false;
  public pokemonComparar1: any;
  public pokemonComparar2: any;

  // myControl = new FormControl();                      AUTO COMPLETE
  // options: string[] = ['One', 'Two', 'Three'];        A    C
  // filteredOptions: Observable<string[]>;              A    C
  

  constructor( 
    public pokemonService: PokemonService,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    //PUXA A LISTA DE POKEMONS DO 0 - 151
    this.pokemonService.getPokemons().subscribe(
      data => {
        this.pokemons = data.results;
        // this.filteredOptions = this.myControl.valueChanges.pipe(                    //AUTOCOMPLETE
        //   startWith(''),
        //   map(value => this._filter(value)),
        // );                                                                          // AUTOCOMPLETE


        //GUARDA OS RESULTADOS NUM ARRAY POKEMON[]
        //O FOR ABAIXO PERCORRE O ARRAY ITEM A ITEM PARA MUDAR O NOME COLOCANDO LETRA MAIUSCULA NO NOME DO POKEMON 
        //E ADICIONA "00" ou "0" DE ACORDO COM O NUMERO DELE
        for ( let i = 0; i <= 1118; i++){
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
  

  //                                                          TENTATIVA DO AUTOCOMPLETE
  // public _filter(value: string): string[] {   
  //   const filterValue = value.toLowerCase();
    
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }                                                        AUTOCOMPLETE


  //PUXA O ID DO POKEMON NA LISTA E ABRE O DIALOG COM O POKEMON ESPECIFICO
  abrirStats(id:number){
    this.pokemonService.pokemonSelecionado = id;    
    const dialogRef = this.dialog.open(DialogComponent, { panelClass: 'custom-dialog-container' });
    console.log();
    //dialogRef.componentInstance.pokemonId = id;
  }

  //PUXA O POKEMON ATRAVÉS DO NOME NO INPUT E EXECUTA A FUNÇÃO DE ABRIR O DIALOG
  buscar(pokemonInput: any){   
    if(!Number.isNaN(parseInt(this.pokemonInput))){
      this.abrirStats(pokemonInput - 1); // O "-1" FAZ REFERENCIA AO INDICE 0 QUE CONTAVA COMO 1
    }else{      
      this.pokemonService.getPokemonByName(pokemonInput.toLowerCase()).subscribe(
        data => {this.abrirStats(data.id - 1);},
        error => {alert('ERRO CARAI')}
      )
    }
  }
  
  //FAZ A BUSCA NO INPUT FUNCIONAR AO PRESSIONAR ENTER
  onKey(event: KeyboardEvent){
    let key = event.which || event.keyCode;
    if (key == 13) {
      this.buscar(this.pokemonInput); // 
    }
  } 

  onKeyComparar1(event: KeyboardEvent){
    let key = event.which || event.keyCode;
    if (key == 13) {
       this.inserirPokemon(this.pokemonComparar1);
    }
  }

  onKeyComparar2(event: KeyboardEvent){
    let key = event.which || event.keyCode;
    if (key == 13) {
       this.inserirPokemon(this.pokemonComparar2);
    }
  }

  inserirPokemon(coco: any){
    console.log(coco);
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

