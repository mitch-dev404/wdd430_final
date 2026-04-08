import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent implements OnInit {
  @ViewChild("subject", { static: false }) subjectRef: ElementRef;
  @ViewChild("msgText", { static: false }) msgTextRef: ElementRef;

  constructor(private msgService: MessageService) {}

  ngOnInit() {}

  currentSender: string = "10";

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message("11205", subject, msgText, this.currentSender);
    this.msgService.addMessage(newMessage);
  }

  onClear() {
    console.log(this.subjectRef);
    console.log(this.msgTextRef);
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
