import { Directive, ElementRef, HostListener } from '@angular/core';
import { constantValues } from "../constantValues"
import { NgControl } from '@angular/forms';

declare var $: any; // declare the jQuery variable to avoid compilation errors

@Directive({
  selector: '.phoneMask' // target elements with class "phoneMask"
})
export class PhoneMaskDirective {
  //constructor(private el: ElementRef, private control: NgControl) { }
  constructor(private el: ElementRef, private control: NgControl) {
    this.el.nativeElement.classList.add('form-control', 'input-height');
  }

  @HostListener('input')
  onInputChange() {
    const value = this.el.nativeElement.value;
    const pattern = /^\d{3}[-]?\d{3}[-]?\d{4}$/;
    const isValid = pattern.test(value);

    if (isValid) {
      $(this.el.nativeElement).mask(constantValues.PHONE_NUMBER_FORMAT, { autoclear: false });
    } else {
      this.control.control?.setErrors({ pattern: true });
    }
  }
}
