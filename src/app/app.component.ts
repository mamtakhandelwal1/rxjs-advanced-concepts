import { Component, ViewChild } from '@angular/core';
import {
  Observable,
  of,
  range,
  generate,
  from,
  interval,
  timer,
  Subject,
} from 'rxjs';
import {
  takeWhile,
  map,
  repeat,
  withLatestFrom,
  isEmpty,
  takeUntil,
  take,
  takeLast,
  concatMap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //takeUntil example
  notifier = new Subject();
  obs = interval(100).pipe(takeUntil(this.notifier));
  //take example
  takeEx = of(1, 2, 3, 4, 5).pipe(take(2));
  //take while example
  takeWhile = of(1, 2, 3, 3, 4, 2, 1).pipe(takeWhile((val) => val < 4, true));
  //take Last example
  takeLast = range(1, 5).pipe(takeLast(3));
  //concatMap example
  innerObservable = of('A', 'B', 'C', 'D');
  concatMap = of(1, 2, 3).pipe(
    concatMap((val) => {
      console.log('source value' + val), console.log('starting new emission');
      return this.innerObservable;
    })
  );

  ngOnInit() {
    //this.takeEx.subscribe((res) => console.log(res));
    //// this.obs.subscribe((res) => console.log(res));
    //this.takeWhile.subscribe((res) => console.log(res));
    this.takeLast.subscribe((res) => console.log(res));
    this.concatMap.subscribe((res) => console.log(res));

    of(1,2,3).pipe(
      concatMap( val => {
        return of(val*2)  //Returning observable
      })
   )
   .subscribe(ret=> {
     console.log('Recd from concatMap : ' + ret);
    })
    
  }

  stopObs() {
    this.notifier.next();
    this.notifier.complete();
  }
}
