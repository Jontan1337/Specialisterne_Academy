import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RangePipe } from '../range.pipe';
import { GameService } from '../services/gameservice';
import { GameState } from '../models/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CommonModule, RangePipe],
  templateUrl: './board.html',
  styleUrl: './board.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Board {
	$state!: Observable<GameState>;

	constructor(private game: GameService) {
	}

	ngOnInit() {
		this.$state = this.game.$state;

		this.game.$submit.subscribe(() => this.onStateChange());
	}

	onStateChange() {
		this.revealLetters();
	}

	revealLetters() {
		const tiles = document.querySelectorAll('.row.current .tile');
		tiles.forEach((tile, index) => {
			setTimeout(() => {
				tile.classList.add('revealing');
				setTimeout(() => {
					tile.classList.add('revealed');
					tile.classList.remove('revealing');
				}, 200);
			}, 1 + 100 * index);
		});
	}

	protected readonly rows: number = 6;
	protected readonly tiles: number = 5;

}
