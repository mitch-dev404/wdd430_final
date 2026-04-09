import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../../../drug.model';

@Component({
  selector: 'fp-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.contactSelected.emit();
  }
}
