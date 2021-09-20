import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {map} from 'rxjs/operators';

declare let window: any;

@Injectable()
export class AppInitService {

  public init() {
    return from(
      this.fetchLocal().then(response => response)
    ).pipe(
      map((config) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (<any>window).config = config;
        return window;
      })).toPromise();
  }

  fetchLocal() {
   return  new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', './assets/app-config.json');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
        else {
          reject('Cannot load configuration...');
        }
      };
      xhr.send();
    });
  }
}
