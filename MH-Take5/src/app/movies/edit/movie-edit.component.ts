import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = 'Movie Edit';
  errorMessage: string;

  private originalMovie: IMovie;
  private editedMovie: IMovie | null;

  get movie(): IMovie | null {
    if (this.movieService.currentMovie && (!this.editedMovie || this.movieService.currentMovie.id !== this.editedMovie.id)) {
      this.onMovieRetrieved(this.movieService.currentMovie);
    }
    return this.editedMovie;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService) { }

  ngOnInit(): void {
    // Watch for changes to the parameter
    // This notifies the component when the user
    // changes from an edit to an add operation
    this.route.params.subscribe(
      param => {
        this.editedMovie = null;
      }
    );
  }

  onMovieRetrieved(movie: IMovie): void {
    // Reset the form back to pristine
    if (this.editForm) {
      this.editForm.reset();
    }

    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalMovie = movie;
    this.editedMovie = Object.assign({}, movie);

    // Adjust the title
    if (movie.id === 0) {
      this.pageTitle = 'Add Movie';
    } else {
      this.pageTitle = `Edit Movie: ${movie.title}`;
    }
  }

  onCancel(): void {
    if (this.movieService.currentMovie.id === 0) {
      // Navigate back to the movie list on cancel of add
      this.router.navigate(['/movies']);
    } else {
      // Navigate back to the movie detail
      this.router.navigate(['/movies', this.movieService.currentMovie.id, 'detail']);
    }
  }

  saveMovie(): void {
    if (this.editForm.valid) {
      this.movieService.saveMovie(this.editedMovie).subscribe(
        () => {
          // Assign the changes from the copy
          Object.keys(this.editedMovie).forEach(key =>
            this.originalMovie[key] = this.editedMovie[key]
          );
          
          // Navigate back to the detail
          this.router.navigate(['/movies', this.movieService.currentMovie.id, 'detail']);
        }
      );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
