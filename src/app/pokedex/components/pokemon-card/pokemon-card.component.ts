import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'pk-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() pokemon: Pokemon;

  constructor(private router: Router) { }

  public goToPokemonDetail(): void {
    this.router.navigate(['/pokedex', this.pokemon.name]);
  }

}
