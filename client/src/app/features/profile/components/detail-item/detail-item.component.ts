import { Component, input } from "@angular/core";

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
  standalone: false
})
export class DetailItemComponent{
  itemTitle = input<string>();
  itemContent = input<string | number | []>();

  constructor(){}

  get getContent(): any {
    const content = this.itemContent();
    if (!content) return;
    if(this.itemTitle() !== 'interests')  return this.itemContent();
    const contentString = this.itemContent().split()
  }
}
