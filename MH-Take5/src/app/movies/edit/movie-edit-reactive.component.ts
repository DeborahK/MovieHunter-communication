import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IMovie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  templateUrl: './movie-edit-reactive.component.html'
})
export class MovieEditReactiveComponent implements OnInit {
  pageTitle: string = 'Edit Movie';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };

  movie: IMovie;
  errorMessage: string;

  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) {

    // With FormBuilder
    this.editForm = this.fb.group({
      title: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      director: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]],
      starRating: ['', [Validators.min(1),
      Validators.max(5)]],
      description: ['']
    });

    // Watch all of the controls on the form
    this.editForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // Initialize strings
    this.formError = {
      'title': '',
      'director': '',
      'starRating': '',
      'description': ''
    };

    this.validationMessages = {
      'title': {
        'required': 'Movie title is required',
        'minlength': 'Movie title must be at least three characters.',
        'maxlength': 'Movie title cannot exceed 50 characters.'
      },
      'director': {
        'required': 'Director is required',
        'minlength': 'Director must be at least 5 characters.',
        'maxlength': 'Director cannot exceed 50 characters.'
      },
      'starRating': {
        'min': 'Rate the movie between 1 (lowest) and 5 (highest).',
        'max': 'Rate the movie between 1 (lowest) and 5 (highest).'
      }
    };
  }

  ngOnInit(): void {
    this.onMovieRetrieved(this.movieService.currentMovie);
  }

  onMovieRetrieved(movie: IMovie): void {
    // Reset the form back to pristine
    if (this.editForm) {
      this.editForm.reset();
    }

    this.movie = movie;
    this.pageTitle = `Edit Movie (Reactive): ${this.movie.title}`;

    // Update the data on the form
    this.editForm.patchValue({
      title: this.movie.title,
      director: this.movie.director,
      starRating: this.movie.starRating,
      description: this.movie.description
    });
  }

  onCancel(): void {
    // Navigate back to the movie detail
    this.router.navigate(['/movies', this.movieService.currentMovie.id, 'detail']);
  }

  // Start of a generic validator
  onValueChanged(data: any): void {
    if (this.editForm) {
      Object.keys(this.formError).forEach(field => {
        const control = this.editForm.get(field);
        if (control) {
          const hasError = control.dirty && !control.valid;
          this.formError[field] = '';
          if (hasError) {
            Object.keys(<object>control.errors).forEach(rule =>
              this.formError[field] += this.validationMessages[field][rule] + ' '
            );
          }
        }
      });
    }
  }

  saveMovie(): void {
    if (this.editForm.valid) {
      // Copy the form values into the object
      Object.keys(this.editForm.value).forEach(key =>
        this.movie[key] = this.editForm.value[key]
      );

      this.movieService.saveMovie(this.movie).subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
      );
    } else if (!this.editForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.editForm.reset();

    // Navigate back to the detail
    this.router.navigate(['/movies', this.movieService.currentMovie.id, 'detail']);
  }
}
