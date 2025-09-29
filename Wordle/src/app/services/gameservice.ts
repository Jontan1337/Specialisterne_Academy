import { Injectable } from '@angular/core';
import { GameState, Row, Tile } from '../models/game.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { KeyState, KeyStates } from '../models/keyboard.model';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	private state: GameState = {
		guesses: [],
		currentGuess: '',
		status: 'playing',
		keyStates: {}
	};

	protected stateSubject = new BehaviorSubject<GameState>(this.state);
	protected submitSubject = new Subject();

	$state = this.stateSubject.asObservable();
	$submit = this.submitSubject.asObservable();

	wordLength = 5;
	maxGuesses = 6;
	
	secretWord = 'CLOVE'; // This should be randomly selected from the wordle_ord.txt file.

	addLetter(letter: string) {
		if (this.state.currentGuess.length < this.wordLength && this.state.status === 'playing') {
			this.state.currentGuess += letter;
			this.updateState();
		}
	}

	removeLetter() {
		this.state.currentGuess = this.state.currentGuess.slice(0, -1);
		this.updateState();
	}

	submitGuess() {
		if (this.state.currentGuess.length !== this.wordLength) return;

		// if (!this.wordList.has(this.state.currentGuess.toLowerCase())) {
		// 	alert('Not in word list');
		// 	return;
		// }

		const evaluatedGuess = this.evaluateGuess(this.state.currentGuess);

		let won = true;
		for (let i = 0; i < this.wordLength; i++) {

			if (evaluatedGuess[i].state !== 'correct') {
				won = false;
			}

		}

		this.state.guesses.push({ tiles: evaluatedGuess });
		this.updateKeyStates(evaluatedGuess);
		this.state.currentGuess = '';

		if (evaluatedGuess.every(tile => tile.state === 'correct')) {
			this.state.status = 'won';
		}
		else if (this.state.guesses.length >= this.maxGuesses) {
			this.state.status = 'lost';
		}

		this.updateState();
		this.submitSubject.next(null);
	}

	evaluateGuess(guess: string): Tile[] {
		const GUESS = guess.toLocaleUpperCase();
		const result: Tile[] = Array.from(GUESS).map(letter => ({ letter, state: 'absent' as KeyState }));
		const countedCharacters: Record<string, number> = {};

		// Count occurrences of each character in the secret word
		for (const char of this.secretWord) {
			countedCharacters[char] = (countedCharacters[char] || 0) + 1;
		}

		// Count correct letters first
		for (let i = 0; i < this.wordLength; i++) {
			if (GUESS[i] === this.secretWord[i]) {
				countedCharacters[GUESS[i]]--;
				result[i] = { letter: GUESS[i], state: 'correct' };
			}
		}

		// Then count present and absent letters
		for (let i = 0; i < this.wordLength; i++) {
			if (result[i].state === 'correct') continue; // Already marked as correct

			if (this.secretWord.includes(GUESS[i]) && countedCharacters[GUESS[i]] > 0) {
				countedCharacters[GUESS[i]]--;
				result[i] = { letter: GUESS[i], state: 'present' };
			}
			else {
				result[i] = { letter: GUESS[i], state: 'absent' };
			}
		}
		return result;
	}

	handleKey(key: string) {
		if (this.state.status !== 'playing') return;

		if (key === 'ENTER') {
			this.submitGuess();
		}
		else if (key === 'BACKSPACE') {
			this.removeLetter();
		}
		else if (/^[A-Z]$/.test(key)) {
			this.addLetter(key);
		}
	}

	updateState() {
		this.stateSubject.next({ ...this.state });
	}

	updateKeyStates(tiles: Tile[]) {
		for (const tile of tiles) {
			if (tile.state === 'absent') {
				this.state.keyStates[tile.letter] = 'absent';
			}
		}
	}
}
