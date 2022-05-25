import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../character';
@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  currentChar!:Character;

  constructor(private http:HttpClient) { }

  getAllCharacters(id:number) {
    return this.http.get<Character[]>("http://localhost:9001/characters/"+id)
  }

  setCharacter(selected:Character){
    this.currentChar = selected;
  }

  getCharacter() {
    return this.currentChar;
  }

  updateCoins(char:Character) {
    return this.http.put<Character>("http://localhost:9001/characters", char)
  }
}
