import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../../drug.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'fp-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private contactListChangeSub!: Subscription;
  term!: string;

  search(value: string) {
    this.term = value;
  }

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactListChangeSub = this.contactService.contactListChangedEvent.subscribe(
          (contactsList: Contact[]) => {
            this.contacts = contactsList;
          },
        );
        this.contactService.getContacts();
    
        this.contactService.contactChangedEvent.subscribe((contactsList: Contact[]) => {
          this.contacts = contactsList;
          console.log(contactsList)
        });
  }

  ngOnDestroy(): void {
    this.contactListChangeSub.unsubscribe();
  }
}
