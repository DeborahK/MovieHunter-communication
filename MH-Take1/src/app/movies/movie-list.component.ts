import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
    pageTitle: string = 'Movie List';
    errorMessage: string;
    showImage: boolean = false;
    listFilter: string;

    filteredMovies: IMovie[];
    movies: IMovie[];

    constructor(private movieService: MovieService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(param => {
            this.pageTitle = 'Movie List';
            this.getMovies();
        });
    }

    getMovies(): void {
        this.movieService.getMovies()
            .subscribe(
                (movies: IMovie[]) => {
                    this.movies = movies;
                    this.filteredMovies = this.performFilter(this.listFilter)
                },
                (error: any) => this.errorMessage = <any>error);
    }

    // Local filter
    performFilter(filterBy: string): IMovie[] {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.movies.filter((movie: IMovie) =>
                movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            return this.movies;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
