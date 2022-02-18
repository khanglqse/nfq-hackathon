import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chart-header',
  templateUrl: './chart-header.component.html',
  styleUrls: ['./chart-header.component.scss']
})
export class ChartHeaderComponent implements OnInit {
  @Input() dateRange: any = [];
  selectedType: any = 'station';
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() export: EventEmitter<any> = new EventEmitter<any>();
  selectedStation: any;
  selectedCountry: any;
  selectedDate:any = 1;

  stationList = [{"id":16,"name":"Aix-Marseille","city":{"id":1204,"country":"FR","country_name":"France"}},{"id":32,"name":"Amsterdam","city":{"id":1215,"country":"NL","country_name":"Netherlands"}},{"id":17,"name":"Barcelona","city":{"id":1203,"country":"ES","country_name":"Spain"}},{"id":6,"name":"Berlin","city":{"id":55,"country":"DE","country_name":"Germany"}},{"id":40,"name":"Bilbao","city":{"id":66,"country":"ES","country_name":"Spain"}},{"id":24,"name":"Bochum","city":{"id":609,"country":"DE","country_name":"Germany"}},{"id":13,"name":"Bordeaux","city":{"id":1206,"country":"FR","country_name":"France"}},{"id":42,"name":"Bryssel","city":{"id":1212,"country":"BE","country_name":"Belgium"}},{"id":19,"name":"Faro","city":{"id":216,"country":"PT","country_name":"Portugal"}},{"id":2,"name":"Frankfurt","city":{"id":241,"country":"DE","country_name":"Germany"}},{"id":9,"name":"Freiburg-Basel (Tyskland)","city":{"id":1228,"country":"DE","country_name":"Germany"}},{"id":29,"name":"Genève-Ornex","city":{"id":1214,"country":"FR","country_name":"France"}},{"id":37,"name":"Graz","city":{"id":274,"country":"AT","country_name":"Austria"}},{"id":3,"name":"Hamburg","city":{"id":287,"country":"DE","country_name":"Germany"}},{"id":7,"name":"Hannover","city":{"id":1208,"country":"DE","country_name":"Germany"}},{"id":4,"name":"Köln-Düsseldorf","city":{"id":1209,"country":"DE","country_name":"Germany"}},{"id":10,"name":"Konstanz","city":{"id":1210,"country":"DE","country_name":"Germany"}},{"id":8,"name":"Leipzig","city":{"id":424,"country":"DE","country_name":"Germany"}},{"id":18,"name":"Lisbon","city":{"id":435,"country":"PT","country_name":"Portugal"}},{"id":15,"name":"Lyon","city":{"id":1213,"country":"FR","country_name":"France"}},{"id":20,"name":"Madrid","city":{"id":471,"country":"ES","country_name":"Spain"}},{"id":21,"name":"Málaga","city":{"id":15,"country":"ES","country_name":"Spain"}},{"id":34,"name":"Milano","city":{"id":483,"country":"IT","country_name":"Italy"}},{"id":1,"name":"München","city":{"id":499,"country":"DE","country_name":"Germany"}},{"id":31,"name":"Nantes","city":{"id":526,"country":"FR","country_name":"France"}},{"id":11,"name":"Nürnberg","city":{"id":527,"country":"DE","country_name":"Germany"}},{"id":12,"name":"Paris","city":{"id":1216,"country":"FR","country_name":"France"}},{"id":41,"name":"Porto","city":{"id":548,"country":"PT","country_name":"Portugal"}},{"id":35,"name":"Rom","city":{"id":693,"country":"IT","country_name":"Italy"}},{"id":33,"name":"Rotterdam","city":{"id":698,"country":"NL","country_name":"Netherlands"}},{"id":39,"name":"Sevilla","city":{"id":762,"country":"ES","country_name":"Spain"}},{"id":5,"name":"Stuttgart","city":{"id":756,"country":"DE","country_name":"Germany"}},{"id":30,"name":"Toulouse","city":{"id":784,"country":"FR","country_name":"France"}},{"id":28,"name":"Trier","city":{"id":1159,"country":"DE","country_name":"Germany"}},{"id":38,"name":"Valencia","city":{"id":837,"country":"ES","country_name":"Spain"}},{"id":36,"name":"Wien","city":{"id":833,"country":"AT","country_name":"Austria"}}]
  stations: { id: number; name: string; }[] = [];
  countries = [
    {id: 85, name: 'Germany'},
    {id: 78, name: 'France'},
    {id: 213, name: 'Spain'},
    {id: 180, name: 'Portugal'},
    {id: 158, name: 'Netherlands'},
    {id: 113, name: 'Italy'},
    {id: 15, name: 'Austria'},
    {id: 22, name: 'Belgium'},
    {id: 219, name: 'Sweden'},
    {id: 220, name: 'Switzerland'},
    {id: 239, name: 'United Kingdom'},
  ]
  constructor() { }

  ngOnInit(): void {
    this.stations = this.stationList.map(m => ({id: m.id, name: m.name}))
    this.selectedDate = this.dateRange[0]?.id
  } 
  
  handleFilterChange(type: string, item: any) {
    this.filterChange.emit({[type]: item?.id})
  }
  handleExportClick() {
    this.export.emit();
  }
  handleTypeChange() {
    this.filterChange.emit({})
  }
}
