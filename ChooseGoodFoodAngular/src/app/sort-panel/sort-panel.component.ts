import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-panel',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    FormsModule
  ],
  templateUrl: './sort-panel.component.html',
  styleUrl: './sort-panel.component.css'
})
export class SortPanelComponent {
  nameSort = '';
  priceSort = '';
  caloriesSort = '';
  glycemicIndexSort = '';

  @Output() criteria = new EventEmitter<any>();
  @Output() sortCanceled = new EventEmitter<any>();

  sort(){
    this.criteria.emit({ 
      nameSort: this.nameSort, 
      priceSort: this.priceSort, 
      caloriesSort: this.caloriesSort, 
      glycemicIndexSort: this.glycemicIndexSort
    })
  }

  clear(){
    this.nameSort = '';
    this.priceSort = '';
    this.caloriesSort = '';
    this.glycemicIndexSort = '';
  }

  cancel(){
    this.sortCanceled.emit();
  }
}
