import { KeyState } from "./keyboard.model";

export interface Tile {
	letter: string;
	state: KeyState;
}

export interface Row {
	tiles: Tile[];
}

export interface GameState {
	guesses: Row[];
	currentGuess: string;
	status: 'playing' | 'won' | 'lost' | 'evaluating';
	keyStates: Record<string, KeyState>;
}