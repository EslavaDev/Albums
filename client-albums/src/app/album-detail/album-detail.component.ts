import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { Album } from '../models/album.model';
import { Image } from '../models/image.model';
import { GLOBAL } from '../global';

@Component({
  selector: 'album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  providers: [AlbumService,ImageService]
})
export class AlbumDetailComponent implements OnInit {

  public album: Album;
  public images: Image[];
  public errorMessage: any;
  public loading: boolean;
  public api_url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService,
    private _imageService: ImageService
  ) { }

  getAlbum() {
    this.loading = true;
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(id).subscribe(
        result => {
          this.album = result.album;
          console.log(result.album);
          if(!this.album){
          this._router.navigate(['/']);
          }else{
            //llamada al metodo del servicio de imagenes
            this._imageService.getImages(result.album._id).subscribe(
              response => {
                this.images = response.images;

                if(!this.images){
                  alert("Sin imagenes");
                }
              },
              err => {
                this.errorMessage = <any>err;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                }
              }
            );
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

  ngOnInit() {
    console.log("Album-detail.component.ts cargado!!");
    this.getAlbum();
    this.api_url=this._imageService.getApiUrl('getImage/');
    //alert(this.api_url);
  }
}
