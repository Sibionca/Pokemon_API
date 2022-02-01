import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemonSelecionado: any;
  public URL_pokemons = 'https://pokeapi.co/api/v2/pokemon/?limit=898'; 
  constructor(private httpClient: HttpClient) {};

    getPokemons(){
      return this.httpClient.get<any>(this.URL_pokemons);
    }

    getPokemon(url: string){
      return this.httpClient.get<any>(url);
    }

    getPokemonById(id: number){
      return this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon/' + id);
    }

    getPokemonByName(name: string){
      return this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon/' + name);
    }
  }



