import { Component, input } from "@angular/core";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  standalone: false,
})

export class LocationComponent {
  itemTitle = input<string>();
  itemContent = input<any>();
}
