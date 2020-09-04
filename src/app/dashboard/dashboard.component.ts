import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashBoardService } from './dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss','./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit,AfterViewInit {

  checked ;
  isLoading = false;
  panelOpenState= false
  isTimelineClicked = false;

  lastUpdatedMinutes: any;
  lastUpdatedSeconds: any;
  lastUpdatedDateTime: any
  lastUpdatedDate: any;
  lastUpdatedTime: any;
  totalCases : any
  totalActive: any
  totalDeaths : any
  totalRecovered : any
  totalTested: any;
  casesPerMil: any;
  deathsPerMil: any;
  testsPerMil: any;

  lastUpdatedDateTimeTimeline: Date;
  totalCasesTimeline : any
  totalActiveTimeline: any
  totalDeathsTimeline : any
  totalRecoveredTimeline : any
  totalTestedTimeline: any;
  casesPerMilTimeline: any;
  deathsPerMilTimeline: any;
  testsPerMilTimeline: any;

  totalCasesIncreasedTimeline : any
  totalActiveIncreasedTimeline : any
  totalDeathsIncreasedTimeline  : any
  totalRecoveredIncreasedTimeline  : any

  totalCasesIncreased : any
  totalActiveIncreased : any
  totalDeathsIncreased  : any
  totalRecoveredIncreased  : any

  totalCasesAllCountries : { country: string, number: any }[] = []
  sortedTotalCasesAllCountries : { country: string, number: any }[] = []

  timelineCountryClicked = false;

  country;
  countryList = [];
  pastData = [];
  pastDataDate = [];
  pastDataDate1 = [];
  pastDataActive = [];
  pastDataRecovered = [];
  pastDataDeaths=[];
  pastDataDailyCases=[];
  pastDataDailyDeaths=[];
  pastDataDailyRecovered=[];
  totalActiveIndia;
  totalRecoveredIndia;
  totalDeathsIndia;
  totalCasesIndia;

  barChartData : {total: string, recovered:string, deaths: string }[] = []
  dataSub : Subscription;
  sortSub : Subscription;
  timelineDataSub: Subscription;

  statesList : {active: string, recovered:string, deaths: string , active_rate: string, recovered_rate:string, death_rate: string, states:string, confirmed:string}[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.statesList);

 constructor(private dashBoardService : DashBoardService,
             private router: Router,
             private route: ActivatedRoute) {this.getPastCountryTimeline(); }

 ngOnInit() {
   this.countryList = this.dashBoardService.getAllCountryList();
   if(localStorage.getItem('country') === null){
     this.getStatsByCountry('India')
   }else{
   this.getStatsByCountry(localStorage.getItem('country'));
   }
   this.sortByanyOfCases();
   this.getStateData()
   //this.getPastCountryTimeline();
   //console.log(this.sortedTotalCasesAllCountries)

 }

 onRefresh(){
   if(localStorage.getItem('country') === null){
     this.getStatsByCountry('India')
   }else{
   this.getStatsByCountry(localStorage.getItem('country'));
   }
   //this.sortedTotalCasesAllCountries = [];
   this.sortByanyOfCases();
   this.getPastCountryTimeline();
 }


 timelineExpand(){
   this.isTimelineClicked = !this.isTimelineClicked;

 }

 sortByanyOfCases(){
   this.sortedTotalCasesAllCountries = [];
   // this.worldSub = this.dashBoardService.getWorldData().subscribe((data) => {
   //   let myData1 = JSON.parse(JSON.stringify(data));


   // 	this.sortedTotalCasesAllCountries.push({'country' :  'World', 'number': myData1.total_cases})
   // })

   this.sortSub = this.dashBoardService.getAllCountryData().subscribe((data) => {
     let myData = JSON.parse(JSON.stringify(data.countries_stat));

     for(let country of myData){
     this.sortedTotalCasesAllCountries.push({'country' :  country.country_name, 'number': country.cases})

     }
     })

   }



 getStatsByCountry(country: string){
   this.isLoading = true;

   localStorage.setItem('country', country);
   this.country=localStorage.getItem('country');
   //this.router.navigate(['/',country], {relativeTo: this.route})
   this.dataSub = this.dashBoardService.getLatestStatsByCountry(country).subscribe((data) => {
     let myData = JSON.parse(JSON.stringify(data.latest_stat_by_country));

     var year = myData[0].record_date.substr(0,4);
     var month = myData[0].record_date.substr(5,2);
     var day = myData[0].record_date.substr(8,2);
     var hours = myData[0].record_date.substr(11,2);
     var min = myData[0].record_date.substr(14,2);
     var sec = myData[0].record_date.substr(17,2);
     let date: Date = new Date(year, month-1, day, hours, min, sec, null);
     var currentDate = Date.parse(new Date().toUTCString());
     var currDateOffset = new Date().getTimezoneOffset();
     var millisec = (date.getTime()  - currDateOffset*1000*60);
     this.lastUpdatedDateTime = new Date(millisec).toString().substr(15,9);
     var minutes = (currentDate - Date.parse(date.toString()))/60000 + date.getTimezoneOffset();
     var seconds = minutes.toString().split('.')[1].substr(0,2);
     //console.log(parseInt(seconds) * 0.6);

      this.lastUpdatedMinutes =  minutes.toString().split('.')[0];
      this.lastUpdatedSeconds = Math.round(parseInt(seconds) * 0.6)
      this.totalTested = myData[0].total_tests;
      this.totalCases = myData[0].total_cases;
      this.totalActive = myData[0].active_cases;
      this.totalRecovered = myData[0].total_recovered;
      this.totalDeaths = myData[0].total_deaths;
      this.totalCasesIncreased = myData[0].new_cases;
      this.totalDeathsIncreased = myData[0].new_deaths;
      this.casesPerMil = myData[0].total_cases_per1m;
      this.deathsPerMil = myData[0].deaths_per1m;
      this.testsPerMil = myData[0].total_tests_per1m;
     this.isLoading = false;
   })
 }

 getStatsByCountryTimeline(country: string){
   //this.timelineCountryClicked=!this.timelineCountryClicked;
   this.totalTestedTimeline ='NA';

      this.totalCasesTimeline = 'NA';
      this.totalActiveTimeline = 'NA';
      this.totalRecoveredTimeline = 'NA';
      this.totalDeathsTimeline = '';
      this.totalCasesIncreasedTimeline = 'NA';
      this.totalDeathsIncreasedTimeline ='NA';
      this.casesPerMilTimeline = 'NA';
      this.deathsPerMilTimeline = 'NA';
      this.testsPerMilTimeline = 'NA';
      this.timelineDataSub = this.dashBoardService.getLatestStatsByCountry(country).subscribe((data) => {
      let myData = JSON.parse(JSON.stringify(data.latest_stat_by_country));

      this.totalTestedTimeline = myData[0].total_tests;

      this.totalCasesTimeline = myData[0].total_cases;
      this.totalActiveTimeline = myData[0].active_cases;
      this.totalRecoveredTimeline = myData[0].total_recovered;
      this.totalDeathsTimeline = myData[0].total_deaths;
      this.totalCasesIncreasedTimeline = myData[0].new_cases;
      this.totalDeathsIncreasedTimeline = myData[0].new_deaths;
      this.casesPerMilTimeline = myData[0].total_cases_per1m;
      this.deathsPerMilTimeline = myData[0].deaths_per1m;
      this.testsPerMilTimeline = myData[0].total_tests_per1m;

   })

 }


 getPastCountryTimeline(){
  //this.timelineCountryClicked=!this.timelineCountryClicked;

     this.timelineDataSub = this.dashBoardService.getPastData().subscribe((data) => {
     let myData = JSON.parse(JSON.stringify(data));
      // this.totalActiveIndia =  myData[myData.length-1].totalconfirmed - (+myData[myData.length-1].totalrecovered + +myData[myData.length-1].totaldeceased)
      // this.totalRecoveredIndia = myData[myData.length-1].totalrecovered
      // this.totalDeathsIndia = myData[myData.length-1].totaldeceased
      // this.totalCasesIndia = myData[myData.length-1].totalconfirmed
      for(var i= myData.length-100 ; i<myData.length; i++){
        this.pastData.push(myData[i].totalconfirmed)
        this.pastDataDate.push(myData[i].date)

        i++;
      }
      for(var j= myData.length-7 ; j<myData.length; j++){
        this.pastDataDate1.push(myData[j].date)
        this.pastDataDailyCases.push(myData[j].dailyconfirmed)
        this.pastDataDailyRecovered.push(myData[j].dailyrecovered)
        this.pastDataDailyDeaths.push(myData[j].dailydeceased)
        i++;
      }
      console.log()
  })

}

 downloadApp(){

 }

 getStateData(){
  //this.timelineCountryClicked=!this.timelineCountryClicked;

     this.timelineDataSub = this.dashBoardService.getAllStateData().subscribe((data) => {
     let myData = JSON.parse(JSON.stringify(data));
      // this.totalActiveIndia =  myData[myData.length-1].totalconfirmed - (+myData[myData.length-1].totalrecovered + +myData[myData.length-1].totaldeceased)
      // this.totalRecoveredIndia = myData[myData.length-1].totalrecovered
      // this.totalDeathsIndia = myData[myData.length-1].totaldeceased
      // this.totalCasesIndia = myData[myData.length-1].totalconfirmed
      for(var i=0; i< myData.state_data.length;i++){
        this.statesList.push({
          'active': myData.state_data[i].active,
          'recovered':myData.state_data[i].recovered,
          'deaths': myData.state_data[i].deaths ,
          'active_rate': myData.state_data[i].active_rate,
          'recovered_rate':myData.state_data[i].recovered_rate,
          'death_rate': myData.state_data[i].death_rate,
          'states': myData.state_data[i].state,
          'confirmed': myData.state_data[i].confirmed
        })
      }
      console.log(myData.state_data.length)
      console.log(this.statesList)
  })

}

@ViewChild(MatSort, {static: false} ) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

   ngOnDestroy(){
     this.sortSub.unsubscribe();
     this.dataSub.unsubscribe();
     //this.timelineDataSub.unsubscribe();
   }


//----------------------------Chart-------------------------------------

   lineChartData = [{
    label: '# of People',
    data: this.pastData,
    borderWidth: 3,
    fill: false
  }];

  lineChartLabels = this.pastDataDate;

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  barChartData1 = [{
    label: 'Confirmed',
    data: this.pastDataDailyCases,
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'Recovered',
    data: this.pastDataDailyRecovered,
    borderWidth: 1,
    fill: false,
  }];

  barChartLabels = this.pastDataDate1;

  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };




 }

