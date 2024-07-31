import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,

    CommonModule,
    FormsModule
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent {
  @Output() filterCanceled = new EventEmitter<any>;
  @Output() criteria = new EventEmitter<any>

  priceFilter = '';
  priceValues: number[] = [];
  caloriesFilter = '';
  caloriesValues: number[] = [];
  glycemicIndexFilter = '';
  glycemicIndexValues: number[] = [];

  filter(){
    this.criteria.emit({
      priceFilter: this.priceFilter,
      priceValues: this.priceValues,
      caloriesFilter: this.caloriesFilter,
      caloriesValues: this.caloriesValues,
      glycemicIndexFilter: this.glycemicIndexFilter,
      glycemicIndexValues: this.glycemicIndexValues
    })
  }

  clear(){
    this.priceFilter = '';
    this.priceValues = [];
    this.caloriesFilter = '';
    this.caloriesValues = [];
    this.glycemicIndexFilter = '';
    this.glycemicIndexValues = [];
  }

  cancel(){
    this.filterCanceled.emit();
  }
}
