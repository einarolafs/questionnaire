import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { getFormsAction } from 'src/app/actions/forms.actions';
import { State } from 'src/app/reducers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private questions: Record<any, any>;
  public question$: Subject<any> = new Subject<any>();
  public title: string;
  private id: string = '';
  private submit: string = '';
  private form: Record<any, any> = {}
  public currentValue: string


  constructor(
    private store: Store<State>
  ) {}

  public ngOnInit() {
    this.store.dispatch(getFormsAction());
    this.store.select('forms')
    .pipe(skip(1))
    .subscribe((data) => {
        this.id = data.id;
        this.submit = data.submit;
        this.title = data.title;

        this.questions =  data.questions.reduce((acc: any, { id, ...rest }: any) => {
          acc[id] = rest;
          return acc;
        }, {})

        console.log(data.questions[0]);
  
        this.question$.next([data.questions[0]]);
    })
  }

  public select(question: any, selection?: string) {
    console.log(question, selection);
    if (question.end) {
      console.log(this.form);
    }

    this.form[question.id] = {
      id: question.id,
      value: selection
    }

    let nextQuestions = question.paths[selection ?? this.currentValue];

    this.question$.next([this.questions[nextQuestions]]);

    this.currentValue = '';
  }

  public getButtonText({ end }: any) {
    return end ? 'Submit' : 'Next';
  }

  public input($event: any) {
    console.log($event)
    this.currentValue = $event.target.value;
  }

}
