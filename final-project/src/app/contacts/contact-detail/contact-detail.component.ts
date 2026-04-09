import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '../../drug.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fp-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onDelete() {
    this.contactService.deleteContact(this.contact)
    this.router.navigate(['/drugs']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }
}
