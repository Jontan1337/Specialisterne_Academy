import { Component, HostListener, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Board } from "./board/board";
import { Keyboard } from "./keyboard/keyboard";
import { GameService } from './services/gameservice';
import { GameState } from './models/game.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Board, Keyboard, AsyncPipe]
})
export class App {
	$state!: Observable<GameState>;

	status: 'won' | 'lost' | 'playing' | 'evaluating' = 'playing';

	constructor(protected gameService: GameService) {
		this.$state = this.gameService.$state;
		this.$state.subscribe(state => this.onStateChange(state));
	}

	onStateChange(state: GameState): void {
		this.status = state.status;
	}

	protected readonly title = signal('Wordle');

	@HostListener('window:keydown', ['$event'])
	onKeydown(e: KeyboardEvent) {
		if (e.altKey || e.ctrlKey || e.metaKey) return;

		const KEY = e.key.toLocaleUpperCase();

		this.gameService.handleKey(KEY);
	}
}
