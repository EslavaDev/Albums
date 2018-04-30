import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
  providers: [AlbumService]
})
export class AlbumEditComponent implements OnInit {

  public album: Album;
  public errorMessage: any;
  public loading: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService
  ) { }

  onSubmit() {
    console.log(this.album);
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.editAlbum(id, this.album).subscribe(
        response => {
          this.album = response.album;

          (!response.album) ? alert('eror en el servidor') : this._router.navigate(['/album',id]);

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

  getAlbum() {
    this.loading = true;
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(id).subscribe(
        result => {
          this.album = result.album;
          console.log(result.album);
          (!this.album) ? this._router.navigate(['/']) : '';
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
    console.log("Album-edit.component.ts cargado!!");
    this.album = new Album("", "");
    this.getAlbum();
  }
}
