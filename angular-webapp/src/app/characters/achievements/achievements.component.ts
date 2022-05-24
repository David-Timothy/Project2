import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/achievement';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  @Input() achievement:Achievement[] = [];
  @Input() isDisplay:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
