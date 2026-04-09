import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Drug } from '../../drug.model';
import { DrugService } from '../drug.service';

@Component({
  selector: 'fp-drug-list',
  standalone: false,
  templateUrl: './drug-list.component.html',
  styleUrl: './drug-list.component.css',
})
export class DrugListComponent implements OnInit, OnDestroy {
  drugs: Drug[] = [];
  private drugListChangeSub!: Subscription;
  term!: string;

  search(value: string) {
    this.term = value;
  }

  constructor(private drugService: DrugService) {}

  ngOnInit() {
    this.drugListChangeSub = this.drugService.drugListChangedEvent.subscribe(
          (drugsList: Drug[]) => {
            this.drugs = drugsList;
          },
        );
        this.drugService.getDrugs();
    
        this.drugService.drugChangedEvent.subscribe((drugsList: Drug[]) => {
          this.drugs = drugsList;
          console.log(drugsList)
        });
  }

  ngOnDestroy(): void {
    this.drugListChangeSub.unsubscribe();
  }
}
