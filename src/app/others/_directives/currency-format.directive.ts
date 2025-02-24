import { Directive, HostListener, Input } from '@angular/core';
import { utils } from '../_helper/utils';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {
  @Input() locale: string = 'en-US';
  @Input() focusValue: boolean = false;

  isLocaleFrench: boolean = false;

  ngOnInit() {
    this.isLocaleFrench = this.locale === 'fr-CA' ? true : false;
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    var target = event.target as HTMLInputElement;
    var caretPosition = this.getCaretPosition(target);
    const number = target.value;
    const inputFieldId = '#' + target.id;
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    const keyEvents = [13, 37, 38, 39, 40, 16, 65];
    const currentKeyEvent = event.which;

    if (keyEvents.includes(currentKeyEvent)) {
      event.preventDefault();
      return;
    }
    this.formatCurrency(event, caretPosition, this.isLocaleFrench);
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: KeyboardEvent) {
    var target = event.target as HTMLInputElement;
    var caretPosition = this.getCaretPosition(target);
    const number = target.value;
    const inputFieldId = '#' + target.id;
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const keyEvents = [13, 37, 38, 39, 40, 16, 65];
    const currentKeyEvent = event.which;

    if (keyEvents.includes(currentKeyEvent)) {
      event.preventDefault();
      return;
    }
    this.formatCurrency(event, caretPosition, this.isLocaleFrench);
  }

  formatCurrency(event, caretPosition, isCultureFrench): void {
    var number = event.target.value;
    var commaDotCount = 0;
    var replaceOrMatch = /,/g;
    var formatType = '.';
    var format = 'en-US';
    var inputFieldId = '#' + event.currentTarget.id;

    if (isCultureFrench === true) {
      formatType = ',';
      format = 'de-DE';
      replaceOrMatch = /[.]/g;
    }

    var previousMatchCount =
      number
        .split(formatType)[0]
        .replace(formatType, '')
        .match(replaceOrMatch) == null
        ? 0
        : number
            .split(formatType)[0]
            .replace(formatType, '')
            .match(replaceOrMatch)!.length;
    var regex = /^[\d,.]+$/;
    commaDotCount =
      number
        .split(formatType)[0]
        .replace(formatType, '')
        .match(replaceOrMatch) === null
        ? 0
        : number
            .split(formatType)[0]
            .replace(formatType, '')
            .match(replaceOrMatch)!.length;

    if (number.length > 0) {
      if (!regex.test(number)) {
        event.target.value = '';
      }
      if (number.indexOf(formatType) >= 0) {
        if (
          number.split(formatType)[1] !== undefined &&
          number.split(formatType)[1].length > 2
        ) {
          number = number.slice(0, -1);
          event.target.value = number;
          return;
        }

        let realNumber = number.split(formatType)[0];
        if (realNumber.length > 11) {
          number =
            number.split(formatType)[0].slice(0, -1).concat(formatType) +
            number.split(formatType)[1];
        }

        var decimalNum = number.split(formatType)[1];
        number = number
          .split(formatType)[0]
          .replace(formatType, '')
          .replace(replaceOrMatch, '');
        if (number !== '' && number !== undefined)
          number = new Intl.NumberFormat(format, {
            minimumFractionDigits: 2,
          }).format(number);

        //If the decimal value is between 01 to 99
        if (
          (utils.isNumber(decimalNum) &&
            decimalNum.length > 0 &&
            decimalNum !== '00') ||
          decimalNum === ''
        )
          number =
            number.split(formatType)[0].replace(formatType, '') +
            formatType +
            decimalNum;
      }
      //This is applicable when your number entered is less than 1000
      else {
        number = number.replace(replaceOrMatch, '');
        if (event.which !== 46) {
          // avoiding formtting when delete key is used.
          number = new Intl.NumberFormat(format, {
            minimumFractionDigits: 2,
          }).format(number);
        }
      }
    }
    var currentMatchCount =
      number
        .split(formatType)[0]
        .replace(formatType, '')
        .match(replaceOrMatch) === null
        ? 0
        : number
            .split(formatType)[0]
            .replace(formatType, '')
            .match(replaceOrMatch)!.length;

    var formatTypeIndex = number.indexOf(formatType);

    let cp = caretPosition < formatTypeIndex;
    let eventWhich = event.which !== 8;
    let cc = commaDotCount !== currentMatchCount;
    let cf = caretPosition === formatTypeIndex - 1;

    event.target.value = number;
    if (cp == true && eventWhich == true && (cc == true || cf == true)) {
      caretPosition++;
      event.target.selectionStart = caretPosition;
      event.target.selectionEnd = caretPosition;
    } else if (previousMatchCount > currentMatchCount) {
      caretPosition--;
      event.target.selectionStart = caretPosition;
      event.target.selectionEnd = caretPosition;
    } else {
      event.target.selectionStart = caretPosition;
      event.target.selectionEnd = caretPosition;
    }
    if (this.focusValue) {//this is to set the focus on the input field just before the decimal point(Only for the first time value load)
      let caretPositionBeforeDecimal =
        this.getCursorPositionBeforeDecimal(number);
      event.target.selectionStart = caretPositionBeforeDecimal;
      event.target.selectionEnd = caretPositionBeforeDecimal;
    }
  }
  getCaretPosition(element: HTMLInputElement | HTMLTextAreaElement): number {
    return element.selectionStart || 0;
  }
  private getCursorPositionBeforeDecimal(formattedValue: string): number {
    let decimalIndex = 0;
    // Find the position of the decimal point
    if (this.isLocaleFrench) {
      decimalIndex = formattedValue.indexOf(',');
    } else {
      decimalIndex = formattedValue.indexOf('.');
    }
    // Return the position just before the decimal point
    return decimalIndex !== -1 ? decimalIndex : formattedValue.length;
  }
}
