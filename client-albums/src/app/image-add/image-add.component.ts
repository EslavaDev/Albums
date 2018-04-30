import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';


import { ImageService } from '../services/image.service';
import { Image } from '../models/image.model';

@Component({
  selector: 'image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
  providers: [ImageService]
})
export class ImageAddComponent implements OnInit {

  public titulo: string;
  public image: Image;
  public errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _imageService: ImageService
  ) {
    this.titulo = "Añadir Imagen!!!";
  }

  onSubmit(){
    console.log(this.image);
    this._route.params.forEach((params : Params)=>{
      let album_id = params['album'];
      this.image.album = album_id;
    this._imageService.addImage(this.image).subscribe(
      response =>{
        this.image = response.image;

        (!response.image)? "error en el servidor ": this._router.navigate(['/editImage', response.image._id]);

      },
      error =>{
        this.errorMessage = <any>error;
        (this.errorMessage != null)? console.log(this.errorMessage):'';
      }
    );
  });
  }


  ngOnInit() {  
    console.log("Image-add.component.ts cargado!!");
    this.image = new Image("","","");
  }

}
