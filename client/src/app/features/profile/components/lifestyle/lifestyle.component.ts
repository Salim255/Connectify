import { Component, input } from "@angular/core";

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
  standalone: false
})

export class LifestyleComponent {
  itemTitle = input<string>();
  itemContent = input<string | number | []>();
}
