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
  public pokemonTotal1: number = 0;
  public pokemonTotal2: number = 0;
  public resultado: string;
  public showResultado: boolean = false;

  // myControl = new FormControl();                      AUTO COMPLETE
  // options: string[] = ['One', 'Two', 'Three'];        A    C
  // filteredOptions: Observable<string[]>;              A    C
  

  constructor( 
    public pokemonService: PokemonService,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    //PUXA A LISTA DE POKEMONS DO 0 - 898
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
        for ( let i = 0; i <= 898; i++){
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
    if(!Number.isNaN(parseInt(this.pokemonInput))){ // Transformo o valor do input em inteiro e verifico se é number ou string
      this.abrirStats(pokemonInput - 1); // O "-1" FAZ REFERENCIA AO INDICE 0 QUE CONTAVA COMO 1
    }else{      
      this.pokemonService.getPokemonByName(pokemonInput.toLowerCase()).subscribe(  // transformo a string em minisculo e puxo na API o pokemon
        data => {this.abrirStats(data.id - 1);}, //recebe a informação da API e pega o ID para abrir na lista, "-1" por conta do indice 0
        error => {alert('ERRO CARAI')}
      )
    }
  }
  
  //FAZ A BUSCA NO INPUT FUNCIONAR AO PRESSIONAR ENTER
  onKey(event: KeyboardEvent){
    let key = event.key;
    if (key == 'Enter') {
      this.buscar(this.pokemonInput); // 
    }
    
  } 

   //ABRE O CONTAINER DE COMPARAÇÃO DE POKEMON 
  CompararPokemons(){
    this.compararPokemons = true;
  }
  //FECHA O CONTAINER DE COMPARAÇÃO DE POKEMON 
  FecharComparar(){
    this.compararPokemons = false;
    this.showResultado = false;
    this.pokemonComparar1 = '';
    this.pokemonComparar2 = '';
  }


  //FAZ A BUSCA NO INPUT FUNCIONAR AO PRESSIONAR ENTER
  onKeyComparar1(event: KeyboardEvent){
    let key = event.which || event.keyCode;
    if (key == 13) {
       this.inserirPokemon1(this.pokemonComparar1);
    }
  }

  //FAZ A BUSCA NO INPUT FUNCIONAR AO PRESSIONAR ENTER
  onKeyComparar2(event: KeyboardEvent){

    let key = event.which || event.keyCode;
    if (key == 13) {
       this.inserirPokemon2(this.pokemonComparar2);
    }
  }

  inserirPokemon1(poke1: any){
  
    if(!Number.isNaN(parseInt(poke1))){ // Transformo o valor do input em inteiro e verifico se é number ou string
      this.pokemonService.getPokemonById(poke1).subscribe(   
        data => {this.pokemonComparar1 = data, this.somaStats1(poke1)}
      )
      
    }else{      
      this.pokemonService.getPokemonByName(poke1.toLowerCase()).subscribe(  // transformo a string em minisculo e puxo na API o pokemon
        data => {this.pokemonComparar1 = data, this.somaStats1(poke1)} , //recebe a informação da API e guarda na variavel
        error => {alert('ERRO CARAI')}
        
      )
    }
  }

  inserirPokemon2(poke2: any){
    if(!Number.isNaN(parseInt(poke2))){ // Transformo o valor do input em inteiro e verifico se é number ou string
      this.pokemonService.getPokemonById(poke2).subscribe(  //  
        data => {this.pokemonComparar2 = data, this.somaStats2(poke2)}
      )
        
        
    }else{      
      this.pokemonService.getPokemonByName(poke2.toLowerCase()).subscribe(  // transformo a string em minisculo e puxo na API o pokemon
        data => {this.pokemonComparar2 = data, this.somaStats2(poke2)} , //recebe a informação da API e guarda na variavel
        error => {alert('ERRO CARAI')}
        
      )
    }
  }

  somaStats1(poke1: any){
    this.pokemonTotal1 = 0; // RESETA OS STATUS PARA NAO SOMAR EM UMA NOVA BUSCA
    this.pokemonService.getPokemonById(poke1).subscribe( 
      data => {poke1 = data}
    )
    for (let i = 0; i < this.pokemonComparar1.stats.length; i++) {
      this.pokemonTotal1 += Number(this.pokemonComparar1.stats[i].base_stat);

    }
    console.log(this.pokemonTotal1);
  }

  somaStats2(poke2: any){
    this.pokemonTotal2 = 0;
    this.pokemonService.getPokemonById(poke2).subscribe( 
      data => {poke2 = data}
    )
    for (let i = 0; i < this.pokemonComparar2.stats.length; i++) {
      this.pokemonTotal2 += Number(this.pokemonComparar2.stats[i].base_stat);

    }
    console.log(this.pokemonTotal2);
  }

  Fight(){
    this.showResultado = false;
    if(this.pokemonTotal1 == 0 || this.pokemonTotal2 == 0){
      this.showResultado = true;
      this.resultado = 'Preencha todos os campos!'
    }else if(this.pokemonTotal1 > this.pokemonTotal2){
      this.showResultado = true;
      this.pokemonComparar1 = this.pokemonComparar1.name[0].toUpperCase() + this.pokemonComparar1.name.slice(1);
      this.pokemonComparar2 = this.pokemonComparar2.name[0].toUpperCase() + this.pokemonComparar2.name.slice(1);
      this.resultado = `${this.pokemonComparar1} ganhou!`
    }else if (this.pokemonTotal1 == this.pokemonTotal2){
      this.showResultado = true;
      this.resultado = 'Empatou!'
      this.pokemonComparar1 = this.pokemonComparar1.name[0].toUpperCase() + this.pokemonComparar1.name.slice(1);
      this.pokemonComparar2 = this.pokemonComparar2.name[0].toUpperCase() + this.pokemonComparar2.name.slice(1);
    }else{
      this.showResultado = true;
      this.pokemonComparar1 = this.pokemonComparar1.name[0].toUpperCase() + this.pokemonComparar1.name.slice(1);
      this.pokemonComparar2 = this.pokemonComparar2.name[0].toUpperCase() + this.pokemonComparar2.name.slice(1);
      this.resultado = `${this.pokemonComparar2} ganhou!`
    }
  }

}
