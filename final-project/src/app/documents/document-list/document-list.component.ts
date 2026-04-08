import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private docListChangeSub: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.docListChangeSub = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      },
    );
    this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
      console.log(documentsList)
    });
  }

  ngOnDestroy(): void {
    this.docListChangeSub.unsubscribe();
  }
}
