import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface DataResponse {
    country: string,
    latest_stat_by_country:[
        {
            id: any,
            country_name: string,
            total_cases: any,
            new_cases: any,
            active_cases: any,
            total_deaths: any,
            new_deaths: any,
            total_recovered: any,
            serious_critical: any,
            region: string,
            total_cases_per1m: any,
            record_date: Date,
            deaths_per1m: any,
            total_tests: any,
            total_tests_per1m: any,
            record_date_pure: Date
        }
      ]

}

interface stateData{
  source: string
state_data:[
  {
    active: number
    active_rate: string
    confirmed:number
    death_rate:string
    deaths:number
    recovered:number
    recovered_rate:string
    state:string
  }
]
}


interface pastData {
  type:[
    {
    dailyconfirmed:string,
    dailydeceased:string,
    dailyrecovered:string,
    region:string,
    date:any,
    totalconfirmed:string,
    totaldeceased:string,
    totalrecovered:string
  }]
}

interface AllCountryData {
  countries_stat:[
    {
    country_name:string,
    cases:any,
    deaths:any,
    region:string,
    total_recovered:any,
    new_deaths:any,
    new_cases:any,
    serious_critical:any,
    active_cases:any,
    total_cases_per_1m_population:any,
    deaths_per_1m_population:any,
    total_tests:any,
    tests_per_1m_population:any
  }]
}

@Injectable({
    providedIn: 'root'
})
export class DashBoardService {

  countries = ["India", "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","CAR","Cabo Verde","Cambodia","Cameroon","Canada","Caribbean Netherlands","Cayman Islands","Chad","Channel Islands","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czechia","DRC","Denmark","Diamond Princess","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Faeroe Islands","Falkland I`slands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","MS Zaandam","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Réunion","S. Korea","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre Miquelon","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Somalia","South Africa","South Sudan","Spain","Sri Lanka","St. Barth","St. Vincent Grenadines","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Trinidad and Tobago","Tunisia","Turkey","Turks and Caicos","UAE","UK","USA","Uganda","Ukraine","Uruguay","Uzbekistan","Vatican City","Venezuela","Vietnam","Western Sahara","Yemen","Zambia","Zimbabwe"]

    constructor(private http: HttpClient) { }

    getAllCountryList(){
      return this.countries.slice();
    }

    getLatestStatsByCountry(country: string) {

      return this.http.get<DataResponse>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php',
      {
          params : {'country': country},

            headers: new HttpHeaders({
                'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
                'x-rapidapi-key': 'd4e0162fbbmsha2e6d7e07552be2p148576jsn1dd3ef7a4a6c',
                'useQueryString': 'true',
                'Content-Type':  'application/json; charset=utf-8',
                'access-control-allow-origin': '*'

      })
  }
      )}

  getAllCountryData() {

    return this.http.get<AllCountryData>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
    {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': 'd4e0162fbbmsha2e6d7e07552be2p148576jsn1dd3ef7a4a6c',
        'useQueryString': 'true',
        'Content-Type':  'application/json; charset=utf-8',
        'access-control-allow-origin': '*'

})
})
}

getPastData() {

  return this.http.get<pastData>('https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline',
  {
    headers: new HttpHeaders({
      'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
      'x-rapidapi-key': 'd4e0162fbbmsha2e6d7e07552be2p148576jsn1dd3ef7a4a6c',
      'useQueryString': 'true',
      'Content-Type':  'application/json; charset=utf-8',
      'access-control-allow-origin': '*'

})
})
}


getAllStateData() {

  return this.http.get<stateData>('https://covid-19-india.p.rapidapi.com/state_data',
  {

        headers: new HttpHeaders({
            'x-rapidapi-host': 'covid-19-india.p.rapidapi.com',
            'x-rapidapi-key': 'd4e0162fbbmsha2e6d7e07552be2p148576jsn1dd3ef7a4a6c',
            'useQueryString': 'true',
            'Content-Type':  'application/json; charset=utf-8',
            'access-control-allow-origin': '*'

  })
}
  )}

// getWorldData() {

//   return this.http.get<any>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php')
// }
}
