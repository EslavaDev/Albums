import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ImageService } from '../services/image.service';
import { Image } from '../models/image.model';
import { GLOBAL } from '../global';

@Component({
  selector: 'image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css'],
  providers: [ImageService]
})
export class ImageEditComponent implements OnInit {
  public titulo: string;
  public image: Image;
  public errorMessage: any;
  public is_edit: boolean;
  public resultUpload;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _imageService: ImageService
  ) {
    this.titulo = "Editar Imagen!!!";
    this.is_edit = true;
  }

  onSubmit() {
    console.log(this.image);
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._imageService.editImage(this.image, id).subscribe(
        response => {
          this.image = response.image;

          if (!response.image) {
            alert("error en el servidor ");
          } else {
            if (!this.filesToUpload) {
              this._router.navigate(['/album', this.image.album]);
            } else {
              this.makeFileRequest(GLOBAL.url + 'upload/' + id, [], this.filesToUpload)
                .then(
                  (result) => {
                    this.resultUpload = result;
                    this.image.picture = this.resultUpload.filename;
                    this._router.navigate(['/album', this.image.album]);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
          (this.errorMessage != null) ? console.log(this.errorMessage) : '';
        }
      );
    });
  }

  getImage() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      console.log(id);
      this._imageService.getImage(id).subscribe(
        response => {
          this.image = response.image;
          console.log(response.image);
          (!response.image) ? this._router.navigate(['/']) : '';
        },
        error => {
          this.errorMessage = <any>error;
          (this.errorMessage != null) ? console.log(this.errorMessage) : '';
        }
      )

    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    })
  }


  ngOnInit() {
    console.log("Image-edit.component.ts cargado!!");
    this.image = new Image("", "", "");
    this.getImage();
  }
}
