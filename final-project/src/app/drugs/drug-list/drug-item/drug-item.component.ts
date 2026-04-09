import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Drug } from '../../../drug.model';

@Component({
  selector: 'fp-drug-item',
  standalone: false,
  templateUrl: './drug-item.component.html',
  styleUrl: './drug-item.component.css'
})
export class DrugItemComponent implements OnInit {
  @Input() drug!: Drug;
  @Output() drugSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.drugSelected.emit();
  }
}
