import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    pageTitle = 'Movie Detail';
    movie: Movie;
    errorMessage: string;

    constructor(private movieService: MovieService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            this.getMovie(id);
        }
    }

    getMovie(id: number) {
        this.movieService.getMovie(id).subscribe(
            movie => this.movie = movie,
          error => this.errorMessage = <any>error
        );
    }

    onBack(): void {
        this.router.navigate(['/movies']);
    }
}
