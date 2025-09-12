import { Component, input } from "@angular/core";

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
  standalone: false
})

export class GenderComponent {
  itemTitle = input<string>();
  itemContent = input<string | number | []>();
}
