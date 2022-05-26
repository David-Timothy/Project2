import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Achievement } from '../achievement';
import { Character } from '../character';
import { CharactersService } from '../services/characters.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters!:Character[]
  achievements!:Achievement[]

  constructor(private charactersService: CharactersService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this.charactersService.getAllCharacters(Number(sessionStorage.getItem('id'))).subscribe((characters: Character[]) => {
      this.characters = characters
    })
  }
  selectCharacter(selected:Character){
    this.charactersService.setCharacter(selected);
    this.router.navigate(['/shop']);
  }


  setAchievement(index: number) {
    this.achievements = this.characters[index].achievements;
  }
}