import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { Album } from '../models/album.model';
import { Image } from '../models/image.model';
import { GLOBAL } from '../global';

@Component({
  selector: 'image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
  providers: [ImageService]
})
export class ImageDetailComponent implements OnInit {

  
  public image: Image;
  public errorMessage: any;
  public loading: boolean;
  public api_url:string;
  public titulo:string
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _imageService: ImageService
  ) {
    this.titulo="Detalle de Imagen";
   }

  getImage() {
    this.loading = true;
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._imageService.getImage(id).subscribe(
        result => {
          this.image = result.image;
          console.log(result.image);
          if(!this.image){
          this._router.navigate(['/']);
          }
          this.loading = false;
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            this._router.navigate(['/']);
          }
        }
      );
    });
  }

  onDelete(id){
    this.confirmado = id;
  }

  onDeleteImage(id){
    this._imageService.deleteImage(id).subscribe(
      response =>{
        
        (!response.image)? alert('error en el servidor'):this._router.navigate(['/album', response.image.album]);;
    },
    error =>{
        this.errorMessage = <any>error;
        (this.errorMessage != null)? console.log(this.errorMessage):'';
      }
    );
  }

  onCancelImage(){
    this.confirmado = null;
  }

  ngOnInit() {
    console.log("Image-detail.component.ts cargado!!");
    this.getImage();
    this.api_url=this._imageService.getApiUrl('getImage/');
    //alert(this.api_url);
  }

}
