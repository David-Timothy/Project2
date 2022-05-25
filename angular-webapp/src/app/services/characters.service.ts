import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../character';
@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http:HttpClient) { }

  getAllCharacters() {
    return this.http.get<Character[]>("http://localhost:9001/characters/1")
  }
  deleteCharacter(id:Number) {
    return this.http.delete(`http://localhost:9001/characters/${id}`)
  }
  addCharacter(character:Partial<Character>) {
    return this.http.post<Character>("http://localhost:9001/characters", character)
  }
}
