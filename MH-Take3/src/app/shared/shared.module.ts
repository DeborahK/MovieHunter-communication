import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { RangeValidatorDirective } from './range.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    StarComponent,
    CriteriaComponent,
    RangeValidatorDirective
  ],
  exports: [
    StarComponent,
    CriteriaComponent,
    CommonModule,
    FormsModule,
    RangeValidatorDirective
  ]
})
export class SharedModule { }
