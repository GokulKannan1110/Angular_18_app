import {
  Directive,
  Input,
  OnChanges,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { utils } from '../_helper/utils';
import { constantValues } from '../constantValues';

@Directive({
  selector: '[appUpdateRequiredValidator]',
})
export class UpdateRequiredValidatorDirective implements OnChanges {
  @Input() enableValidator!: boolean;
  @Input() isValidatorsChanged!: boolean;
  @Input() isPhoneNumber = false;
  @Input() isInputForCurrency = false;
  @Input() locale = constantValues.CULTURE_ENGLISH;
  constructor(@Self() private ngControl: NgControl) {}

  ngOnInit() {
    this.UpdateRequiredValidator();
  }
  ngAfterViewInit() {
    this.UpdateRequiredValidator();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isValidatorsChanged) {
      this.UpdateRequiredValidator();
    }
  }

  UpdateRequiredValidator() {
    const control = this.ngControl.control as FormControl;
    if (!control) {
      return;
    }

    const validators = control.validator;
    if (!this.enableValidator) {
      if (validators) {
        control?.clearValidators();
        if (this.isPhoneNumber) {
          control?.setValidators([this.phoneNumberValidator()]);
        } else if (this.isInputForCurrency) {
          control?.setValidators([this.validateNumberInput()]);
        }
      }
      control?.updateValueAndValidity();
    } else {
      if (this.isPhoneNumber) {
        control?.setValidators([
          Validators.required,
          this.phoneNumberValidator(),
        ]);
      } else if (this.isInputForCurrency) {
        control?.setValidators([
          Validators.required,
          this.validateNumberInput(),
        ]);
      } else {
        control?.setValidators([Validators.required]);
      }
      control?.updateValueAndValidity();
    }
  }

  phoneNumberValidator(): any {
    return (control: FormControl) => {
      const phoneNumberPattern = /^\d{3}[-]?\d{3}[-]?\d{4}$/;
      if (!control.value || phoneNumberPattern.test(control.value)) {
        return null;
      } else {
        return { invalidPhoneNumber: true };
      }
    };
  }

  validateNumberInput(): any {
    return (control: FormControl) => {
      let value = control.value;
      if(!utils.isUndefinedEmptyOrNull(control.value) && typeof value === 'string') {
        value = utils.UpdateAndFormatValue(value,this.locale);
      }      
      const maxValue = constantValues.MaxLoanAmount;

      if (value > maxValue) {
        return { maxValueExceeded: true };
      }

      return null;
    };
  }
}
