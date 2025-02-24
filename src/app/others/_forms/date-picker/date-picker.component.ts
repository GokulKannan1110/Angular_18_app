import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() fromDateAtBegin: Date | undefined;
  @Output() selectedate = new EventEmitter();
  @Input() isValidDateRange: boolean | undefined;
  today = new Date();
  @Input() date = new FormControl(moment());
  constructor() { }

  ngOnInit(): void {
    if (this.fromDateAtBegin != undefined) {
      this.date = new FormControl(moment(this.fromDateAtBegin));
    }
  }

  setDate(date: Date){
    if (this.date != undefined) {
      this.date = new FormControl(moment(date));
    }
  }

  setToday(){
    let date = new Date();
    this.date = new FormControl(moment(date));
    this.addEvent();
  }

  addEvent() {
    this.selectedate.emit(this.date.value);
  }

 // date = new FormControl(moment());
}
