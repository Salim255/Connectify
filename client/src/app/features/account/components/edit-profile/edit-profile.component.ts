import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";
import { Profile } from "src/app/features/profile/model/profile.model";
import { PhotoCaptureResult, PhotoService } from "src/app/core/services/media/photo.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: false
})

export class EditProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  editProfileForm!: FormGroup;
  accountProfile: Profile | null = null;
  accountProfileSubscription!: Subscription;

  constructor(
    private photoService: PhotoService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.editProfileForm = this.formBuilder.group({
      avatar: [this.accountProfile?.avatarUrl, Validators.required],
      name: [this.accountProfile?.name, Validators.required],
      age: [this.accountProfile?.age, Validators.required],
      gender: [this.accountProfile?.gender, Validators.required],
      location: [
        `${this.accountProfile?.location?.country}, ${this.accountProfile?.location?.city} `,
         Validators.required,
        ],
      bio: [this.accountProfile?.bio, Validators.required],
      lifestyle: ['', Validators.required]
    })
  }

    onFileSelected(event: Event):void {

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const result =  this.photoService.webPlatformFileUpload(file);
    if (result && result as PhotoCaptureResult) {
      //this.photoUploads[this.clickedPhotoIndex] = result.formData;
      //this.photos.at(this.clickedPhotoIndex).setValue(result.preview );
      if (this.accountProfile) {
        this.accountProfile.avatarUrl = result.preview;
      }

    }
  }

  async onEditPhoto(): Promise<void>{
    try {
    /*   if (this.photos.at(slotIndex).value) {
        this.photos.at(slotIndex).reset();
        this.photoUploads[slotIndex] = null;
        return;
      } */

      const { preview, formData }: PhotoCaptureResult = await this.photoService.takePicture( );
      if (!preview || !formData) return;

      // 1) Set preview for UI
     // this.photos.at(slotIndex).setValue(preview);

      // 2) Store the FormData for submission later
      //this.photoUploads[slotIndex] = formData;
   } catch (error) {
    console.log(error, "hello from result");
       if (error instanceof Error &&  error.message === 'web-platform') {
        this.onSelectFile()
      }
   }
  }

  onSelectFile(){
    const input = this.fileInputRef.nativeElement;
    input.value = ''; // reset input so it always triggers change
    input.click();
  }

  subscribeToAccountProfile(){
    this.accountProfileSubscription = this.accountService.getAccountProfile.subscribe(profile => {
      this.accountProfile = profile;
    })
  }
}
