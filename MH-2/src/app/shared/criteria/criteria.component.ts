import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,
         Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mh-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  hitMessage: string;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;

  @Output() valueChange: EventEmitter<string> =
              new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount']) {
      if (changes['hitCount'].currentValue === null) {
        this.hitMessage = '';
      } else if (changes['hitCount'].currentValue === 0) {
        this.hitMessage = 'No matches found';
      } else {
        this.hitMessage = 'Hits: ' + this.hitCount;
      }
    }
  }

  ngOnInit() {
  }

}
