import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieShellComponent } from './movie-shell/movie-shell.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/movie.effects';

const movieRoutes: Routes = [
  { path: '', component: MovieShellComponent },
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(movieRoutes),
    StoreModule.forFeature('movies', reducer),
    EffectsModule.forFeature(
      [ MovieEffects ]
    ),
  ],
  declarations: [
    MovieShellComponent,
    MovieListComponent,
    MovieDetailComponent
  ]
})
export class MovieModule { }
