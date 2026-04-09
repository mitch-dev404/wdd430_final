import { Component, OnInit } from '@angular/core';

import { Contact } from '../drug.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'fp-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  selectedContact!: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
