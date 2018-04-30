import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumListComponent }   from './album-list/album-list.component';
import { AlbumAddComponent } from './album-add/album-add.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';



const AppRoutes: Routes = [
  { path:'', component:AlbumListComponent },
  { path:'listAlbum', component:AlbumListComponent },
  { path:'createAlbum', component:AlbumAddComponent },
  { path:'album/:id', component:AlbumDetailComponent },
  { path:'editAlbum/:id', component:AlbumEditComponent },
  { path:'addImage/:album', component:ImageAddComponent },
  { path:'editImage/:id', component:ImageEditComponent },
  { path:'image/:id', component:ImageDetailComponent },
  { path:'**', component:AlbumListComponent },
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);