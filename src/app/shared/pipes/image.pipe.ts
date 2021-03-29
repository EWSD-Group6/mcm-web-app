import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string, arg: [number, number]): string {
    const [w, h] = arg;
    return value.replace('{width}', String(w)).replace('{height}', String(h));
  }

}
