import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatOptionSelectionChange, MatChipInputEvent } from '@angular/material';
import { musicSets } from '../musicSets';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
  displayedColumns: string[] = ['artist', 'festival', 'year'];
  dataSource = new MatTableDataSource(musicSets);
  tags = [];

  festivalsSet: Set<string> = new Set<string>();
  festivals = [];
  selectedFestival: string;

  artistsSet: Set<string> = new Set<string>();
  artists = [];
  selectedArtist: string;

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.initUniqueFestivals();
    this.initUniqueArtists();
  }

  initUniqueFestivals() {
    musicSets.forEach(element => {
      this.festivalsSet.add(element.festival);
    });
    this.festivalsSet.forEach(element => {
      this.festivals.push(element);
    });
    this.festivals.sort((n1, n2) => {
      if (n1 > n2) {
          return 1;
      }
      if (n1 < n2) {
          return -1;
      }
      return 0;
    });
  }

  initUniqueArtists() {
    musicSets.forEach(element => {
      this.artistsSet.add(element.artist);
    });
    this.artistsSet.forEach(element => {
      this.artists.push(element);
    });
    this.artists.sort((n1, n2) => {
      if (n1 > n2) {
          return 1;
      }
      if (n1 < n2) {
          return -1;
      }
      return 0;
    });
  }

  onClickMe(row) {
    window.open(row.url, '_blank');
  }

  doFilterSets() {
    let temp = new MatTableDataSource(musicSets);
    if (this.tags.length === 0) {
      this.dataSource = temp;
    } else {
      this.tags.forEach(element => {
        temp.filter = element.trim().toLocaleLowerCase();
        temp = new MatTableDataSource(temp.filteredData);
      });
      this.dataSource = temp;
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onMatChipInputEvent(event: MatChipInputEvent) {
    const tag = event.value;
    this.addTag(tag);
    event.input.value = '';
  }

  addTag(tag: string) {
    if (this.tags.includes(tag) || tag === '') {
      return;
    }
    this.tags.push(tag);
    this.doFilterSets();
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(item => item !== tag);
    this.doFilterSets();
  }

  onSelectedChanged(event: MatOptionSelectionChange) {
    if (event.isUserInput === false) {
      // this is the old value that was selected
      this.removeTag(event.source.value);
    } else {
      this.addTag(event.source.value);
    }
  }
}

