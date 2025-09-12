import { Component, input } from "@angular/core";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  standalone: false
})
export class BioComponent{
   itemTitle = input<string>();
  itemContent = input<string | number | []>();
}
