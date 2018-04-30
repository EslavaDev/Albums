import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';


import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  providers: [AlbumService]
})
export class AlbumListComponent implements OnInit {

  public loading : boolean;
  public title: string;
  public albums: Album[];
  public errorMessage: any;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService
  ) {
    this.title = "Listado de Albums!!!";
  }



  getAlbums(){
    this.loading =true;
    this._albumService.getAlbums().subscribe(
        result =>{
            this.albums = result.albums;
            console.log(result.albums);
            (!this.albums)? alert('error en el servidor'):'';
            this.loading=false;
        },
        error =>{
            this.errorMessage = <any>error;
            (this.errorMessage != null)? console.log(this.errorMessage):'';
        }
    );
  }

  onDelete(id){
    this.confirmado = id;
  }

  onDeleteAlbum(id){
    this._albumService.deleteAlbum(id).subscribe(
      response =>{
        
        (!response.album)? alert('error en el servidor'):this.getAlbums();
    },
    error =>{
        this.errorMessage = <any>error;
        (this.errorMessage != null)? console.log(this.errorMessage):'';
      }
    );
  }

  onCancelAlbum(){
    this.confirmado = null;
  }

  ngOnInit() {  
    console.log("Album-list.component.ts cargado!!");
    this.getAlbums();
  }
}
