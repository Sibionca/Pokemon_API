
import { Component, Input, OnInit} from '@angular/core';
import { Pokemon } from '../Models/Pokemon';
import { PokemonService } from '../services/pokemon.service';
declare var $: any

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent{
 @Input('pokemon')
 public pokemon: Pokemon;
 public pokemonTotal: number = 0;


 //MODELAR ESSA VARIAVEL PARA RECEBER UM POKEMONAPI(MODEL)
 public pokemonAPI: any;


  constructor(public pokemonService: PokemonService){}
  
  ngOnInit(){   
    
    //RECEBE POKEMON DE DIALOG (name, number, url) E CHAMA A URL DELE, DETALHANDO ASSIM O POKEMON E SALVANDO EM POKEMONAPI
    this.pokemonService.getPokemon(this.pokemon.url).subscribe(
      data => {        
        this.pokemonAPI = data;
          
        //FAZ A PRIMEIRA LETRA DOS STATUS FICAR EM MAISCULO
        for ( let i = 0; i <=  5; i++){
          this.pokemonAPI.stats[i].stat.name = this.pokemonAPI.stats[i].stat.name[0].toUpperCase() + this.pokemonAPI.stats[i].stat.name.slice(1);
        }
        //FAZ A PRIMEIRA LETRA DOS TIPOS FICAR EM MAÍSCULO
        for(let i = 0; i < this.pokemonAPI.types.length; i++){
          this.pokemonAPI.types[i].type.name = this.pokemonAPI.types[i].type.name[0].toUpperCase() + this.pokemonAPI.types[i].type.name.slice(1);
        }
        //FAZ A PRIMEIRA LETRA DOS NOMES FICAR EM MAÍSCULO
        this.pokemonAPI.name = this.pokemonAPI.name[0].toUpperCase() + this.pokemonAPI.name.slice(1);
        
        //PREENCHE OS NUMEROS DE ID DO POKEMON ADICIONANDO "00" ou "0"
        if(this.pokemonAPI.id<=8){
          this.pokemonAPI.id = "00" + this.pokemonAPI.id;
        } else if(this.pokemonAPI.id<=98){
          this.pokemonAPI.id = "0" + this.pokemonAPI.id;
        } 
        //SOMA TODOS OS STATUS DO POKEMON E GUARDA NA VARIAVEL
        for (let i = 0; i < this.pokemonAPI.stats.length; i++) {
          this.pokemonTotal += Number(this.pokemonAPI.stats[i].base_stat);
        }
      }
    )
      // PUXA OS STATUS E ATRIBUI AS INFORMAÇÕES PARA O PROGRASSBAR PARA ATÉ 200
    setTimeout(() => {
      for (let i = 0; i < this.pokemonAPI.stats.length; i++) {
          var valorBase = this.pokemonAPI.stats[i].base_stat;
          var valorAux = 'width: ' + valorBase/2 + '%';
          $("#pb_" + i).attr("style", valorAux);
      }
    }, 250);
  }
}
