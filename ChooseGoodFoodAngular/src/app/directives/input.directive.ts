import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective implements OnInit{
  el = inject(ElementRef);

  ngOnInit(): void {
      const style = this.el.nativeElement.style;

      style.border = 'none';
      style.borderBottom = '3px solid purple';
  }
}
