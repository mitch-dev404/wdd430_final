import { Pipe, PipeTransform } from '@angular/core';

import { Drug } from '../drug.model';

@Pipe({
  name: 'drugsFilter',
  standalone: false,
})
export class DrugsFilterPipe implements PipeTransform {
  transform(drugs: Drug[], term) {
    let filteredDrugs: Drug[] = [];
    if (term && term.length > 0) {
      filteredDrugs = drugs.filter((drug: Drug) =>
        drug.name.toLowerCase().includes(term.toLowerCase()),
      );
    }
    if (filteredDrugs.length < 1) {
      return drugs;
    }
    return filteredDrugs;
  }
}
