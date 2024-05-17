import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { TextFormatPipe } from '../pipe/text-format.pipe';

@NgModule({
 // declarations: [TextFormatPipe],
  imports: [
    CommonModule
  ],
 // exports: [TextFormatPipe]
})
export class PipesModule { }
