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
  isDisplayAchievement:boolean = false;
  isDisplayInput:boolean = false;
  character!:Partial<Character>

  constructor(private charactersService: CharactersService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCharacters()
    this.character = {
      account_id: 1,
      name:""
    }
  }

  getAllCharacters() {
    this.charactersService.getAllCharacters(1).subscribe((characters: Character[]) => {
      this.characters = characters
    })
  }
  selectCharacter(selected:Character){
    this.charactersService.setCharacter(selected);
    this.router.navigate(['/shop']);
  }


  setAchievement(index: number) {
    this.achievements = this.characters[index].achievements;
    this.isDisplayAchievement = !this.isDisplayAchievement;
    console.log(this.achievements)
  }
  setDisplay(value: boolean) {
    this.isDisplayAchievement = value
  }
  addCharacter() {
    console.log(this.character)
    this.charactersService.addCharacter(this.character).subscribe(character => {
      console.log(character.id)
      this.getAllCharacters();
    })
  }
  deleteCharacter(id:Number) {
    console.log(id)
    this.charactersService.deleteCharacter(id).subscribe(() => {
      this.getAllCharacters();
    })
  }
}
