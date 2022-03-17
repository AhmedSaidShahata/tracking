import {Directive, ElementRef, HostListener} from '@angular/core';
import {TranslatePipe} from "../service/translate.pipe";
import {TranslateService} from "../service/translate.service";
import {ToastsManager} from "ng2-toastr";

@Directive({
  selector: '[myEnglishOnly]'
})
export class EnglishOnlyDirective {
  AllowedString = " qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM Backspace ";
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];
  tr: TranslatePipe;

  constructor(private el: ElementRef,
              private toast: ToastsManager,
              private translate: TranslateService
  ) {
    this.tr = new TranslatePipe(translate);

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (this.AllowedString.indexOf(event.key) == -1
    ) {
      event.preventDefault();
      this.toast.clearAllToasts()

      this.toast.info(this.tr.transform("english_only"));

    } else {
      this.toast.clearAllToasts()

    }
  }
}
