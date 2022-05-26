import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchievmentService {

  constructor(private http:HttpClient) { }

  private getAchievments(char_id:number){
    return this.http.get<Achievment[]>("http://localhost:9001/achievements/"+char_id)
  }

  getAchievmentsInfo(char_id:number){
    var achievements: Achievment[] = [];
    this.getAchievments(char_id).subscribe(
      (res) => {achievements = res;}
    );
    var res = [];
    for(let achievment of achievements){
      res.push(new AchievmentInfo(achievment.name, achievment.description));
    }
    return res;
  }

  postAchievment(achievment:Partial<Achievment>) {
    return this.http.post<Achievment>("http://localhost:9001/achievements", achievment)
  }

  earnAchievment(name:string, description:string, char_id:number){
    var alreadyEarned = false;
    for(let achievment of this.getAchievmentsInfo(char_id)){
      if(achievment.name == name)
        alreadyEarned = true;
    }
    if(!alreadyEarned) {
      var earned = new Achievment();
      earned.char_id = char_id;
      earned.name = name;
      earned.description = description;
      this.postAchievment(earned).subscribe(()=>{});
    }
  }
}

class Achievment {
  id!: number;
  char_id!: number;
  name!: string;
  description!: string;
}

class AchievmentInfo {
  name: string;
  description: string;

  constructor(name:string, description:string) {
    this.name = name;
    this.description = description;
  }
}
