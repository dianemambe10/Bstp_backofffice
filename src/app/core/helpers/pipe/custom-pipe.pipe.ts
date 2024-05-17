import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom-pipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
