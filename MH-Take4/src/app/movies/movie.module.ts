import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieShellComponent } from './movie-shell.component';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieEditComponent } from './edit/movie-edit.component';

import { MovieService } from './movie.service';
import { MovieEditReactiveComponent } from './edit/movie-edit-reactive.component';

const movieRoutes: Routes = [
  { path: '', component: MovieShellComponent },
  { path: ':id/edit', component: MovieEditComponent },
  { path: ':id/editReactive', component: MovieEditReactiveComponent }
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(movieRoutes)
  ],
  declarations: [
    MovieShellComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieEditReactiveComponent
  ],
  providers: [
    MovieService
  ]
})
export class MovieModule { }
