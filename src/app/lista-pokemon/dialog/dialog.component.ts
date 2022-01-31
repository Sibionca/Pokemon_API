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
      }      
    )
    
  }

  fecha(){
    this.dialogRef.close();
  }


}



