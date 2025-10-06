import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isWatchlist = false;
  @Output() action = new EventEmitter<any>();

  constructor() {}

  onAction() {
    this.action.emit(this.movie);
  }

  animateIn(card: HTMLElement) {
    gsap.to(card, {
      scale: 1.08,
      y: -5,
      boxShadow: '0 15px 30px rgba(0,0,0,0.35)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  animateOut(card: HTMLElement) {
    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  animateOnLoad(card: HTMLElement) {
    gsap.from(card, {
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });
  }
}
