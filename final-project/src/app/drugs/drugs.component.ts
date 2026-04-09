import { Component, OnInit } from '@angular/core';

import { Drug } from '../drug.model';
import { DrugService } from './drug.service';

@Component({
  selector: 'fp-drugs',
  standalone: false,
  templateUrl: './drugs.component.html',
  styleUrl: './drugs.component.css',
  providers: [DrugService],
})
export class DrugsComponent implements OnInit {
  selectedDrug!: Drug;

  constructor(private drugService: DrugService) {}

  ngOnInit() {
    this.drugService.drugSelectedEvent.subscribe((drug: Drug) => {
      this.selectedDrug = drug;
    });
  }
}
