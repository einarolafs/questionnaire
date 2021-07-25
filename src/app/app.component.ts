import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  forms$: Observable<Record<any, any>>;

  constructor(private store: Store<State>) {
    this.forms$ = store.select('forms');
  }

  public ngOnInit() {
    this.forms$.subscribe((data) => {
      console.log(data);
    })
  }
  
  title = 'questionnaire';
}
