import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from './get-data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  jobname = [1, 23, 34, 4, 5, 3];
  dataList: any;
  allData: any;
  currentPage: number = 0;
  pageSize: number = 100;
  jobTitles: string[] = [];
  locationFilter: string = '';
  countries$: any=[];
  countryFilter: any;

  constructor(private route: ActivatedRoute, private router: Router, private service: GetDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.countries$ = this.service.getListOfCountries();

    }, 500);
    this.loadData();
  }

  loadData() {
    this.service
      .getAllData(
        this.currentPage,
        this.pageSize,
        this.jobTitles,
        this.locationFilter,
        this.countryFilter
      )
      .subscribe((res: any) => {
        console.log(res, 'Get paginated data');
        this.dataList = res;
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
    this.currentPage = 0;
    this.loadData();
  }
}