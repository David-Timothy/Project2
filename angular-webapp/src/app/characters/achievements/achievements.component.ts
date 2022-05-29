import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Achievement } from 'src/app/achievement';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  @Input() achievements!:Achievement[];
  @Input() isDisplay!:boolean;
  @Output() displayEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  setDisplay() {
    this.displayEvent.emit(!this.isDisplay)
  }
}
