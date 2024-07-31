import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective implements OnInit{
  el = inject(ElementRef);

  @Input() mode = 'light'

  ngOnInit(): void {
      const style = this.el.nativeElement.style;

      style.border = 'none';
      style.borderBottom = '3px solid purple';

      if(this.mode === 'dark'){
        style.borderBottom = '3px solid white';
        style.backgroundColor = 'purple';
        style.color = 'white';
      }
  }
}
