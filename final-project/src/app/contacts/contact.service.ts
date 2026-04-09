import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Contact } from '../drug.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  contacts: Contact[] = [];

  // baseUrl = 'https://wdd430-4f6c3-default-rtdb.firebaseio.com/';
  baseUrl = 'https://final-project-e0b34-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        this.http.get<Contact[]>(this.baseUrl + '/drugs.json', { headers: headers }).subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a: Contact, b: Contact) => a.id.localeCompare(b.id));
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          (error: any) => {
            console.error(error);
          },
        );
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts()
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (
      originalContact == null ||
      originalContact == undefined ||
      newContact == undefined ||
      newContact == null
    ) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts()
  }

  deleteContact(contact: Contact) {
    if (contact == undefined || contact == null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts()
  }

  storeContacts() {
    JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.put(this.baseUrl + '/drugs.json', this.contacts, { headers }).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }
}
