import { Component, OnInit, OnDestroy } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private msgListChangeSub: Subscription;

  constructor(private msgService: MessageService) {}

  ngOnInit() {
    this.msgListChangeSub = this.msgService.messageListChangedEvent.subscribe(
      (messagesList: Message[]) => {
        this.messages = messagesList;
      },
    );
    this.msgService.getMessages()

    this.msgService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy(): void {
    this.msgListChangeSub.unsubscribe();
  }
}
