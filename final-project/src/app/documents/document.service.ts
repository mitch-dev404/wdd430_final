import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  documents: Document[] = [];

  baseUrl = 'https://wdd430-4f6c3-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.get<Document[]>(this.baseUrl + '/documents.json', { headers: headers }).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a: Document, b: Document) => a.id.localeCompare(b.id));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument == null ||
      originalDocument == undefined ||
      newDocument == undefined ||
      newDocument == null
    ) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document == undefined || document == null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
    JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.put(this.baseUrl + '/documents.json', this.documents, { headers }).subscribe(() => {
      this.documentChangedEvent.next(this.documents.slice());
    });
  }
}
