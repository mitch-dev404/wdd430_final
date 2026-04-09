import { Component, signal } from '@angular/core';

@Component({
  selector: 'fp-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fp');
}
