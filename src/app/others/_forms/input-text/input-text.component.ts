import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { constantValues } from 'src/app/constantValues';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() enableValidator = false;
  @Input() value: string | number = '';
  @Input() maxLength = 100;
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @ViewChild ('loanAmountRef') loanAmountRef: any;
  @Input() isInputForCurrency = false;
  @Input() locale = 'en-US';
  @Input() focusValue: boolean = false;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  haspatterError(): boolean | undefined {
    return this.ngControl?.control?.hasError('pattern');
  }

  clearRequiredValidations(control: FormControl) {
    const validators = control.validator;
    if (this.enableValidator && control.touched) {
      if (validators) validators['required'] = null;

      // control?.removeValidators(Validators.required);
      if (validators) control?.setValidators(validators);
      control?.updateValueAndValidity();
    } else {
      control?.setValidators([]);
      control?.updateValueAndValidity();
    }
  }

  onBlur($event: FocusEvent) {
    this.blurEvent.emit($event);
  }

  public triggerKeyUpEvent(): void {
    const event = new KeyboardEvent('keyup', { key: 'a' }); // Create a new keyup event
    this.loanAmountRef.nativeElement.dispatchEvent(event); // Dispatch the event on the input element
  }
}
