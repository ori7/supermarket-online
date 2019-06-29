import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) { return value; }
    var re = new RegExp(args, 'gi');   //  'gi' for case insensitive (we can use 'g' to be case sensitive).
    return value.replace(re, "<mark>" + args + "</mark>");
  }
}