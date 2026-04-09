import { Component, OnInit, Input } from '@angular/core';

import { Drug } from '../../drug.model';
import { DrugService } from '../drug.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fp-drug-detail',
  standalone: false,
  templateUrl: './drug-detail.component.html',
  styleUrl: './drug-detail.component.css',
})
export class DrugDetailComponent implements OnInit {
  @Input() drug!: Drug;

  constructor(
    private drugService: DrugService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onDelete() {
    this.drugService.deleteDrug(this.drug)
    this.router.navigate(['/drugs']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.drug = this.drugService.getDrug(id);
    });
  }
}
