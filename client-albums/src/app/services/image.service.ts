import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';
import { Image } from '../models/image.model';
import { Album } from '../models/album.model';

@Injectable()
export class ImageService {
    public url :string;
    constructor(
        private _http:Http,
    ) { 
        this.url = GLOBAL.url;
    }

    getApiUrl(segment = ''){
        let url = this.url+segment;
        return url
    }

    addImage(image: Image): Observable<any>{
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'image',params,{headers:headers})
                   .map(res => res.json());
    }

    getImages(albumId=null): Observable<any>{
        if(albumId == null){
            return this._http.get(this.url+'images')
                       .map(res => res.json())
        }else{
            return this._http.get(this.url+'images/'+albumId)
                       .map(res => res.json())
        }
    }

    getImage(id): Observable<any>{
        return this._http.get(this.url+'image/'+id)
        .map(res => res.json())
    }

    editImage(image: Image, id:string): Observable<any>{
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.put(this.url+'image/'+id,params,{headers:headers})
                   .map(res => res.json());
    }

    deleteImage(id:string): Observable<any>{
        return this._http.delete(this.url+'image/'+id)
                         .map(res => res.json());
    }
}
