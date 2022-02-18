import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartData, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataService } from './service/data.service';
import { capitalize, keys } from 'lodash';
import * as XLSX from 'xlsx';
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
  pickups: any = [];
  returns: any = [];
  overdue: any = [];
  returnOpen: any = [];
  damage: any = [];
  voucher: any = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('bookingChart') test: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
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
    },
  };

  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  // methods

  handleFilterChange(chart: any, filterModel: any = {}) {
    if (chart === 'booking') {
      this.dataService.getBooking(filterModel).subscribe((m: any) => this.combineBookingNCustomer(m, 'bookingData'))
    }
    if (chart === 'customer') {
      this.dataService.getCustomer(filterModel).subscribe((m: any) => this.combineBookingNCustomer(m, 'customerData'))
    }
    if (chart === 'revenue') {
      this.dataService.getRevenue(filterModel).subscribe((m: any) => this.combineRevenue(m))
    }
    if (chart === 'todo') {
      this.dataService.getTodo('pickup', filterModel).subscribe((m: any) => this.pickups = m)
      this.dataService.getTodo('return', filterModel).subscribe((m: any) => this.returns = m)
      this.dataService.getTodo('over-due-event', filterModel).subscribe((m: any) => this.overdue = m)
      this.dataService.getTodo('damage', filterModel).subscribe((m: any) => this.damage = m)
      this.dataService.getTodo('open-amount-bookings', filterModel).subscribe((m: any) => this.returnOpen = m)
      this.dataService.getTodo('voucher', filterModel).subscribe((m: any) => this.voucher = m)
    }
  }
  downloadImage(type: any) {
    var link = document.createElement('a');
    link.download = `${type}.PNG`;
    link.href = this.test.nativeElement.toDataURL()
    link.click();
  }
  exportExcel() {
    /* make the worksheet */
    var p = XLSX.utils.json_to_sheet(this.pickups.items);
    var r = XLSX.utils.json_to_sheet(this.returns.items);
    var o = XLSX.utils.json_to_sheet(this.overdue.items);
    var d = XLSX.utils.json_to_sheet(this.damage.items);
    var ro = XLSX.utils.json_to_sheet(this.returnOpen.items);
    var v = XLSX.utils.json_to_sheet(this.voucher.items);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, p, "Pickup");
    XLSX.utils.book_append_sheet(wb, r, "Return");
    XLSX.utils.book_append_sheet(wb, o, "Overdue");
    XLSX.utils.book_append_sheet(wb, d, "Damage");
    XLSX.utils.book_append_sheet(wb, ro, "Returned With Amount");
    XLSX.utils.book_append_sheet(wb, v, "Voucher");

    /* generate an XLSX file */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
  combineRevenue(data: any) {
    this.revenueData = {
      labels: data.filter((m: any) => m.type !== "BOOKING").map((m: any) => capitalize(m.type)),
      datasets: [{
        data: data.filter((m: any) => m.type!== 'BOOKING').map((m: any) => m.amount),
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970"]
      }],
    }
  }
  combineBookingNCustomer(data: any, type: string) {
    const result = {
      labels: keys(data),
      datasets: [
        { data: keys(data).map(key => data[key].this_year), label: 'This year' },
        { data: keys(data).map(key => data[key].last_year), label: 'Last year' }
      ]
    }
    type === 'customerData' ? this.customerData = result : this.bookingData = result
  }
  initChart() {
    this.dataService.getTodo('pickup').subscribe(m => this.pickups = m)
    this.dataService.getTodo('return').subscribe(m => this.returns = m)
    this.dataService.getTodo('over-due-event').subscribe(m => this.overdue = m)
    this.dataService.getTodo('damage').subscribe((m: any) => this.damage = m)
    this.dataService.getTodo('open-amount-bookings').subscribe((m: any) => this.returnOpen = m)
    this.dataService.getTodo('voucher').subscribe((m: any) => this.voucher = m)
    this.dataService.getRevenue({ date: 1 }).subscribe((m: any) => this.combineRevenue(m))
    this.dataService.getCustomer({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'customerData'))
    this.dataService.getBooking({}).subscribe((m: any) => this.combineBookingNCustomer(m, 'bookingData'))
  }

}

