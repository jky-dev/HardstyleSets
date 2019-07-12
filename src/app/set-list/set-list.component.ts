import { Component, OnInit, ViewChild } from '@angular/core';
import { sets } from '../sets';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
  displayedColumns: string[] = ['artist', 'festival', 'year', 'url'];
  dataSource = new MatTableDataSource(sets);
  originalDataSource = this.dataSource;
  sets = sets;
  tags = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onClickMe(url) {
    window.open(url, '_blank');
  }

  doFilterTags() {
    console.log('Filtering tags');
    let temp = this.originalDataSource;
    if (this.tags.length === 0) {
      this.dataSource = new MatTableDataSource(sets);
    } else {
      this.tags.forEach(element => {
        console.log('Filtering: ', element.trim().toLocaleLowerCase());
        temp.filter = element.trim().toLocaleLowerCase();
        temp = new MatTableDataSource(temp.filteredData);
      });
      this.dataSource = temp;
    }
    this.dataSource.sort = this.sort;
  }

  doAddTag(tag) {
    if (this.tags.includes(tag)) {
      return;
    }
    this.tags.push(tag);
    this.doFilterTags();
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(item => item !== tag);
    console.log(this.tags.length);
    this.doFilterTags();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
