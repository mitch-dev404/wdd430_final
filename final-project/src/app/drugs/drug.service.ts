import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Drug } from '../drug.model';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  drugSelectedEvent = new EventEmitter<Drug>();
  drugChangedEvent = new EventEmitter<Drug[]>();
  drugListChangedEvent = new Subject<Drug[]>();
  maxDrugId: number;

  drugs: Drug[] = [];

  baseUrl = 'https://final-project-e0b34-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.maxDrugId = this.getMaxId();
  }

  getDrugs() {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        this.http.get<Drug[]>(this.baseUrl + '/drugs.json', { headers: headers }).subscribe(
          (drugs: Drug[]) => {
            this.drugs = drugs;
            this.maxDrugId = this.getMaxId();
            this.drugs.sort((a: Drug, b: Drug) => a.id.localeCompare(b.id));
            this.drugListChangedEvent.next(this.drugs.slice());
          },
          (error: any) => {
            console.error(error);
          },
        );
  }

  getDrug(id: string): Drug {
    for (let drug of this.drugs) {
      if (drug.id === id) {
        return drug;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.drugs.forEach((drug) => {
      const currentId = parseInt(drug.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDrug(newDrug: Drug) {
    if (newDrug == undefined || newDrug == null) {
      return;
    }
    this.maxDrugId++;
    newDrug.id = this.maxDrugId.toString();
    this.drugs.push(newDrug);
    this.storeDrugs()
  }

  updateDrug(originalDrug: Drug, newDrug: Drug) {
    if (
      originalDrug == null ||
      originalDrug == undefined ||
      newDrug == undefined ||
      newDrug == null
    ) {
      return;
    }

    const pos = this.drugs.indexOf(originalDrug);
    if (pos < 0) {
      return;
    }

    newDrug.id = originalDrug.id;
    this.drugs[pos] = newDrug;
    this.storeDrugs()
  }

  deleteDrug(drug: Drug) {
    if (drug == undefined || drug == null) {
      return;
    }
    const pos = this.drugs.indexOf(drug);
    if (pos < 0) {
      return;
    }
    this.drugs.splice(pos, 1);
    this.storeDrugs()
  }

  storeDrugs() {
    JSON.stringify(this.drugs);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.put(this.baseUrl + '/drugs.json', this.drugs, { headers }).subscribe(() => {
      this.drugChangedEvent.next(this.drugs.slice());
    });
  }
}
