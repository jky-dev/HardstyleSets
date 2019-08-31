import { Component, OnInit } from '@angular/core';
import { musicSets } from '../musicSets';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  festivalsSet: Set<string> = new Set<string>();
  festivals = [];
  sets = musicSets;

  constructor() { }

  ngOnInit() {
    this.initialiseFestivals();
  }

  initialiseFestivals() {
    this.sets.forEach(element => {
      this.festivalsSet.add(element.festival);
    });
    this.festivalsSet.forEach(element => {
      this.festivals.push(element);
    })
    this.festivals.sort((n1, n2) => {
      if (n1 > n2) {
          return 1;
      }
      if (n1 < n2) {
          return -1;
      }
      return 0;
    });
    console.log(this.festivals);
  }

}

