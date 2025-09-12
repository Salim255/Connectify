import { Component, input } from "@angular/core";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  standalone: false
})
export class ScoreComponent {
  itemTitle = input<string>();
  itemContent = input<string | number | []>();
}
