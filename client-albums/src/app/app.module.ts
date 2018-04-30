import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }      from '@angular/http';

import { routing, AppRoutingProviders }       from  './app.routing';

import { AppComponent }  from './app.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumAddComponent } from './album-add/album-add.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageDetailComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
