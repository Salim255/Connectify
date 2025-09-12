import { Component, input } from "@angular/core";

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss'],
  standalone: false
})

export class InterestsComponent{
  itemTitle = input<string>();
  itemContent = input<any>();
}
