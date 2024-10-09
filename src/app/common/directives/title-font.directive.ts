import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitleFont]'
})
export class TitleFontDirective {

  constructor(private el: ElementRef<HTMLElement>) { 
    this.applyStyle();
  }

  applyStyle(): void {
    this.el.nativeElement.style.fontSize='20px';
  }

}
