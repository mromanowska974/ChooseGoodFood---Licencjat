import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective implements OnInit {
  el = inject(ElementRef);

  @Input() mode = 'light'

  ngOnInit(): void {
      const style = this.el.nativeElement.style;

      style.border = '2px solid purple';
      style.borderRadius = '10px';
      style.backgroundColor = 'white';
      style.color = 'purple';
      style.height = '30px';

      if(this.mode==='dark'){
        style.backgroundColor = 'purple';
        style.color = 'white';
        style.border = '2px solid white';
      }
  }
}
