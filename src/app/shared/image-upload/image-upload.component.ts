import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
 // @ViewChild('fileInput') el: ElementRef;
  @Output() selectImage = new EventEmitter<File>();
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  @Input() preview = 'assets/images/users/user-dummy-img.jpg';
  @Input() round = '';   // 'rounded-circle'



  imageInfos?: Observable<any>;

  constructor() {}

  ngOnInit(): void {

  }
      // File Upload
      imageURL: any;
      fileChange(event: any) {
        let fileList: any = (event.target as HTMLInputElement);
        let file: File = fileList.files[0];
        this.selectImage.emit(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
            document.querySelectorAll('#user-img').forEach((element: any) => {
              element.src = this.imageURL;
            });
        }

        reader.readAsDataURL(file)
      }

}
