import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  messages: Message[] = [];

  baseUrl = 'https://wdd430-4f6c3-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getMessages() {
    // return this.messages.slice();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.get<Message[]>(this.baseUrl + '/messages.json', { headers: headers }).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a: Message, b: Message) => a.id.localeCompare(b.id));
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (newMessage == undefined || newMessage == null) {
      return;
    }
    this.maxMessageId++
    newMessage.id = this.maxMessageId.toString()
    this.messages.push(newMessage)
    this.storeMessages()
  }

  storeMessages() {
    JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http.put(this.baseUrl + '/messages.json', this.messages, { headers }).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }
}
