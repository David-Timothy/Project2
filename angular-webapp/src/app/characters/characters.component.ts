import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { Character } from '../character';
import { CharactersService } from '../services/characters.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  constructor(private charactersService: CharactersService) { }
  characters!:Character[]
  achievements!:Achievement[]
  isDisplayAchievement:boolean = false;
  ngOnInit(): void {
    this.getAllCharacters()
  }
  getAllCharacters() {
    this.charactersService.getAllCharacters().subscribe((characters: Character[]) => {
      this.characters = characters
    })
  }
  setAchievement(index: number) {
    this.achievements = this.characters[index].achievements;
    this.isDisplayAchievement = !this.isDisplayAchievement;
    console.log(this.achievements)
  }
  setDisplay(value: boolean) {
    this.isDisplayAchievement = value
  }
}
