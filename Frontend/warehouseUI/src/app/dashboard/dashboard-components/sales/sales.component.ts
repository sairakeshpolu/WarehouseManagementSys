import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid
} from 'ng-apexcharts';
import { formatDate } from "@angular/common";
import { SharedService } from '../../../service/shared.service';
import { AppConstants } from '../../../model/app-constants';
import { take } from 'rxjs';


export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],

})
export class SalesComponent {

  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions !: Partial<activeusercardChartOptions> | any;

  constructor(private sharedService: SharedService) {
    if (this.sharedService.isManager || this.sharedService.isSalesPerson) {
      this.sharedService.get(AppConstants.ORDER_STATISTICS).pipe(
        take(1)
      ).subscribe({
        next: (res) => {
          if (res && res != '')
            this.formGraphStatistics(res);
        },
        error: (err) => { }
      });
    }
  }

  formGraphStatistics(response: any) {
    const format = 'dd-MMM';
    const locale = 'en-US';
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let day1 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day2 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day3 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day4 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day5 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day6 = formatDate(date, format, locale);
    date.setDate(date.getDate() + 1);
    let day7 = formatDate(date, format, locale);

    let da1Val = 0;
    let da2Val = 0;
    let da3Val = 0;
    let da4Val = 0;
    let da5Val = 0;
    let da6Val = 0;
    let da7Val = 0;

    response.forEach((val: any) => {
      let formattedDateVal = formatDate(val.date, format, locale);
      if (formattedDateVal == day1)
        da1Val = val.count;
      else if (formattedDateVal == day2)
        da2Val = val.count;
      else if (formattedDateVal == day3)
        da3Val = val.count;
      else if (formattedDateVal == day4)
        da4Val = val.count;
      else if (formattedDateVal == day5)
        da5Val = val.count;
      else if (formattedDateVal == day6)
        da6Val = val.count;
      else if (formattedDateVal == day7)
        da7Val = val.count;
    });

    // active users
    this.activeusercardChartOptions = {
      series: [
        {
          name: 'Orders created',
          data: [da1Val, da2Val, da3Val, da4Val, da5Val, da6Val, da7Val],
          color: "#fb9678",
        },
        /*{
          name: 'Orders delivered',
          data: [280, 250, 325, 215, 250, 310, 280],
          color: "#03c9d7",
        },*/
      ],
      xaxis: {
        categories: [day1, day2, day3, day4, day5, day6, day7],
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 300,

      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: "dark"
      },

      grid: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },

      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 6,
        },
      },
    }
  }


}
