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
  // ngOnChanges(changes: SimpleChange) {
  //   if (changes.achievements)
  // }
  // ngOnChanges(changes: SimpleChanges) {
    // if (changes["isDisplay"].currentValue === true) {
    //   let container = document.querySelector("#container")
    //   if (container !== null ) {
    //     container.style.display = "block";
    //   }
    // }
      // const chng = changes[propName];
      // const cur  = JSON.stringify(chng.currentValue);
      // const prev = JSON.stringify(chng.previousValue);
      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      // console.log(`this is current: ${cur}. this is previous value ${prev}`)
    // }
  // }
}
