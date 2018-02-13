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

    movie: IMovie;
    private originalMovie: IMovie;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService) { }

    ngOnInit(): void {
        // Watch for changes to the parameter
        this.route.params.subscribe(
            param => {
                const id = +param['id'];
                this.getMovie(id);
            }
        );
    }

    getMovie(id: number): void {
        this.movieService.getMovie(id).subscribe(
            movie => this.onMovieRetrieved(movie),
            error => this.errorMessage = <any>error
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
        this.movie = Object.assign({}, movie);

        // Adjust the title
        if (this.movie.id === 0) {
            this.pageTitle = 'Add Movie';
        } else {
            this.pageTitle = `Edit Movie: ${this.movie.title}`;
        }
    }

    saveMovie(): void {
        if (this.editForm.valid) {
            this.movieService.saveMovie(this.movie).subscribe(
                () =>  {
                    // Assign the changes from the copy
                    Object.keys(this.movie).forEach(key =>
                        this.originalMovie[key] = this.movie[key]
                    );
                    this.onSaveComplete();
                }
            );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editForm.reset();

        // Navigate back to the movie list
        this.router.navigate(['/movies']);
    }
}
