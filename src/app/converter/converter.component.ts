import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnChanges {
  rate: any;
  selection = ['USD', 'UAH'];
  symbols: string[] = [];
  base: any = '';
  conv: any = '';
  constructor(private getData: ApiService) {
    getData.data(this.selection).subscribe((data: any) => {
      this.rate = formatNumber(Number(data.result));
      console.log(data);
    });
    getData.allSymbols().subscribe((data) => {
      console.log(data);
      Object.keys(data.symbols).map((el) => {
        this.symbols.push(el);
      });
    });
  }
  baseChange(event: any) {
    this.base = event.target.value;
    if (event.target.value === '') {
      this.conv = '';
    } else {
      const temp = formatNumber(this.base * this.rate);
      this.conv = temp;
    }
  }
  convChange(event: any) {
    if (event.target.value === '') {
      this.base = '';
      this.conv = '';
    } else {
      this.conv = event.target.value;
      const temp = formatNumber(this.conv / this.rate);
      this.base = temp;
    }
  }
  selectBaseChange(event: any) {
    this.getData.data([event, this.selection[1]]).subscribe((data: any) => {
      this.rate = formatNumber(data.result);
      const temp = formatNumber(this.base * data.result);

      this.conv = Number(temp) === 0 ? '' : temp;
    });
    this.selection[0] = `${event}`;
  }
  selectConvChange(event: any) {
    this.getData.data([this.selection[0], event]).subscribe((data: any) => {
      this.rate = formatNumber(data.result);
      const temp = formatNumber(this.base * data.result);
      this.conv = Number(temp) === 0 ? '' : temp;
    });
    this.selection[1] = `${event}`;
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
function formatNumber(num: number) {
  if (Number(num.toFixed(2)) === 0 && num !== 0) {
    console.log(num.toFixed(2));
    let i = 2;
    while (Number(num.toFixed(i)) === 0 && i <= 100) {
      ++i;
    }
    return num.toFixed(i);
  }
  return num.toFixed(2);
}
