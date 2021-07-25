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

  public submitted$: Subject<boolean> = new Subject<boolean>();


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

        this.questions =  this.normalizeContent(data)
  
        this.question$.next([data.questions[0]]);
    })
  }

  public select(question: any, selection?: string) {
    this.form[question.id] = {
      title: question.title,
      answer: selection ?? this.currentValue
    }

    if (question.end) {
      console.table(this.form);
      this.submitted$.next(true);
      return;
    }

    let nextQuestions = question.paths[selection as string];

    this.question$.next([this.questions[nextQuestions]]);
  }

  public getButtonText({ end }: any) {
    return end ? 'Submit' : 'Next';
  }

  public input(target: any) {
    this.currentValue = target.value;
  }

  private normalizeContent(data: any) {
    return data.questions.reduce((acc: any, { id, ...rest }: any) => {
      acc[id] = {id, ...rest};
      return acc;
    }, {})
  }

}
