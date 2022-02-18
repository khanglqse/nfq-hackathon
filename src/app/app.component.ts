import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartData, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataService } from './service/data.service';
import { capitalize, keys } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stations: { id: number; name: string; }[] = [];
  countries: { id: number; name: string; }[] = [];
  revenueData: any;
  constructor(private dataService: DataService) { }
  title = 'hackathon';
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  pickups: any = ['berlin', 'ha noi'];
  returns: any = [];
  overdue: any = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.dataService.getTodo('pickup').subscribe(m => this.pickups = m)
    this.dataService.getTodo('return').subscribe(m => this.returns = m)
    this.dataService.getTodo('over-due-event').subscribe(m => this.overdue = m)
    this.countries = [
      { id: 85, name: 'Germany' },
      { id: 78, name: 'France' },
      { id: 213, name: 'Spain' },
      { id: 180, name: 'Portugal' },
      { id: 158, name: 'Netherlands' },
      { id: 113, name: 'Italy' },
      { id: 15, name: 'Austria' },
      { id: 22, name: 'Belgium' },
      { id: 219, name: 'Sweden' },
      { id: 220, name: 'Switzerland' },
      { id: 239, name: 'United Kingdom' },
    ]
    this.initChart();
  }
  public bookingData: any;
  public customerData: any;
  public lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    responsive: true
  }

  public lineChartType: ChartType = 'line';

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    }
  };

  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // methods

  handleFilterChange(chart: any, filterModel: any = {}) {
    console.log(filterModel)
    if (chart === 'booking') {
      this.dataService.getCustomer({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'bookingData'))
    }
    if (chart === 'customer') {
      this.dataService.getCustomer({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'customerData'))
    }
    if (chart === 'revenue') {
      this.dataService.getRevenue(filterModel).subscribe((m: any) => this.combineRevenue(m))
    }
    if (chart === 'todo') {
      this.dataService.getTodo('pickup', filterModel).subscribe((m: any) => this.pickups = m)
      this.dataService.getTodo('return', filterModel).subscribe((m: any) => this.returns = m)
      this.dataService.getTodo('over-due-event', filterModel).subscribe((m: any) => this.overdue = m)
    }
  }
  combineRevenue(data: any) {
    this.revenueData = {
      labels: data.map((m: any) => capitalize(m.type)),
      datasets: [{
        data: data.map((m: any) => m.amount)
      }]
    }
  }
  combineBookingNCustomer(data: any, type: string) {
    const result = {
      labels: keys(data),
      datasets: [
        { data: keys(data).map(key => data[key].this_year) , label: 'This year'},
        { data: keys(data).map(key => data[key].last_year) , label: 'Last year'}
      ]
    }
    type === 'customerData' ? this.customerData = result : this.bookingData = result
  }
  initChart() {
    this.dataService.getRevenue({ date: 1 }).subscribe((m: any) => this.combineRevenue(m))
    this.dataService.getCustomer({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'customerData'))
    this.dataService.getBooking({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'bookingData'))
  }

}

