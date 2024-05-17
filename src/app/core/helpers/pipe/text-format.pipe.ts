import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textformat'
})
export class TextFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value?.replace(/<[^>]*>/g, '').substring(0,200) + "..."
  }

}
