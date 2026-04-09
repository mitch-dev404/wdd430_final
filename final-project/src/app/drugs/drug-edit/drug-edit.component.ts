import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Drug } from '../../drug.model';
import { DrugService } from '../drug.service';

@Component({
  selector: 'fp-drug-edit',
  standalone: false,
  templateUrl: './drug-edit.component.html',
  styleUrl: './drug-edit.component.css',
})
export class DrugEditComponent {
  originalDrug!: Drug;
  drug!: Drug;
  groupDrugs: Drug[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private drugService: DrugService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalDrug = this.drugService.getDrug(id);
      if (!this.originalDrug) {
        return;
      }
      this.editMode = true;
      this.drug = JSON.parse(JSON.stringify(this.originalDrug));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDrug = new Drug(
      value.id,
      value.name,
      value.brands,
      value.sideEffects,
      value.uses,
      value.className,
      value.controlled,
    );

    if (this.editMode === true) {
      this.drugService.updateDrug(this.originalDrug, newDrug);
    } else {
      this.drugService.addDrug(newDrug);
    }

    this.router.navigate(['/drugs']);
  }

  onCancel() {
    this.router.navigate(['/drugs']);
  }
}
