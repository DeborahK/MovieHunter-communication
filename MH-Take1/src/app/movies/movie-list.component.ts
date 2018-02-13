import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Movie List';
    errorMessage: string;
    showImage: boolean = false;
    listFilter: string;

    filteredMovies: IMovie[];
    movies: IMovie[];

    @ViewChild('filterElement') filterElementRef: ElementRef;

    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this.listFilter);
    // }

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    ngAfterViewInit(): void {
        if (this.filterElementRef.nativeElement) {
            this.filterElementRef.nativeElement.focus();
        }
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe(
            (movies: IMovie[]) => {
                this.movies = movies;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    performFilter(filterBy: string | null): void {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            this.filteredMovies = this.movies.filter((movie: IMovie) =>
                movie.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            this.filteredMovies = this.movies;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
