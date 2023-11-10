import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  dataList: any;
  currentPage: number = 0;
  pageSize: number = 10;
  jobTitles: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private service: GetDataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAllData(this.currentPage, this.pageSize, this.jobTitles).subscribe((res: any) => {
      console.log(res, "Get all data");
      this.dataList = res.content; // Assuming your data is in the 'content' property
    });
  }

  isPeopleRoute(): boolean {
    const segments: string[] = this.router.url.split('/');
    return segments.includes('left');
  }

  nextPage() {
    this.currentPage++;
    this.loadData();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  onJobTitleChange(selectedJobTitles: string[]) {
    this.jobTitles = selectedJobTitles;
    this.currentPage = 0; // Reset to first page when filter changes
    this.loadData();
  }
}