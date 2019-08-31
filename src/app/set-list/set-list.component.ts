import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { musicSets } from '../musicSets';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {
  displayedColumns: string[] = ['artist', 'festival', 'year'];
  sets = musicSets;
  dataSource = new MatTableDataSource(this.sets);
  originalDataSource = this.dataSource;
  tags = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClickMe(row) {
    window.open(row.url, '_blank');
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

