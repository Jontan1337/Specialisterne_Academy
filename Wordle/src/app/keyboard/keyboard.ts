import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { KeyStates } from '../models/keyboard.model';
import { GameService } from '../services/gameservice';
import { Observable } from 'rxjs';
import { GameState } from '../models/game.model';

@Component({
  selector: 'app-keyboard',
  imports: [NgClass, AsyncPipe],
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.css'
})
export class Keyboard {

	$state!: Observable<GameState>
	
	constructor(public gameService: GameService) {
		
	}

	ngOnInit() {
		this.$state = this.gameService.$state;
	}

	protected readonly letters: string[][] = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
	];

	handleClick(key: string) {
		this.gameService.handleKey(key);
	}
}
