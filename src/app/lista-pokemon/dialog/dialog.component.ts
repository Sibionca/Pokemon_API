import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { Pokemon } from 'src/app/Models/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public pokemons: Pokemon[];
  public pokemonStats: any[];
  public pokemonAPI: any;
  public pokemonTotal = 0;
  public pokemonId:any = 0;
  

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.pokemonId = this.pokemonService.pokemonSelecionado;
    //AQUI PUXA A LISTA DE POKEMONS DNV, PRIMEIRO VC PUXOU NO LISTAPOKEMONS E AQUI VC PUXA DNV P/ 
    //PODER USAR COMO A LISTA DO PARAMETRO A SER PASSADO PARA O APP-POKEMONS
    this.pokemonService.getPokemons().subscribe(
      data => {
        this.pokemons = data.results;  
        console.log(data.results)      
      }      
    )
    //PEGAR STATS DO POKEMON SEPARADAMENTE
    this.pokemonService.getPokemonById(this.pokemonId + 1).subscribe(
      data => {        
        this.pokemonStats = data.stats;
        this.pokemonAPI = data;
        for (let i = 0; i < this.pokemonStats.length; i++) {
          this.pokemonTotal += Number(this.pokemonStats[i].base_stat);
        }
        this.pokemonAPI.height = (this.pokemonAPI.height/10);
        this.pokemonAPI.weight = (this.pokemonAPI.weight/10);
      }      
    )
    
  }

  fecha(){
    this.dialogRef.close();
  }


}



