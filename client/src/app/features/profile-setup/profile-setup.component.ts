import { Component, OnInit, signal } from "@angular/core";

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],
  standalone: false,
})
export class ProfileSetupComponent implements OnInit {
  headerTitle = signal<string>('view profile');

  ngOnInit(): void {

  }
  onBack(): void{

  }
}
