import { UserImagesComponent } from './components/user-images/user-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageSearchComponent } from './components/image-search/image-search.component';

const routes: Routes = [
  { path: '', component: ImageSearchComponent },
  { path: 'users/:id', component: UserImagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
