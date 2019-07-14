import { Component, OnInit, ViewChild } from '@angular/core';
import { b2sYoutube } from '../b2sYoutube';
import { qdanceYoutube } from '../qdanceYoutube';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
  displayedColumns: string[] = ['artist', 'festival', 'year', 'url'];
  sets = [...b2sYoutube, ...qdanceYoutube];
  dataSource = new MatTableDataSource(this.sets);
  originalDataSource = this.dataSource;
  tags = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    const sortState: MatSort = {active: 'year', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClickMe(url) {
    window.open(url, '_blank');
  }

  doFilterTags() {
    let temp = this.originalDataSource;
    if (this.tags.length === 0) {
      this.dataSource = new MatTableDataSource(this.sets);
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

  doAddTag(tag) {
    if (this.tags.includes(tag)) {
      return;
    }
    this.tags.push(tag);
    this.doFilterTags();
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(item => item !== tag);
    this.doFilterTags();
  }
}

