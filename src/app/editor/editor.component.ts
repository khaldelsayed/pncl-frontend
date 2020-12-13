import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MediumEditor from 'medium-editor';
import { FirestoreService } from '../data/firestore.service';
import { AuthService } from '../core/Services/auth.service';
import { renderToString } from 'katex';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.css' ]
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {

  editor: MediumEditor;
  userId: string;
  private editableInputSub: Subscription;

  @ViewChild('textBox') textBox: ElementRef;

  constructor(private authService: AuthService, private firestoreService: FirestoreService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.firestoreService.getDocument(this.userId)
      .subscribe((data) => {
        if (data && data['document'] !== 'undefined') {
          this.editor.setContent(data['document']);
        } else {
          this.editor.setContent('<p><br></p>');
        }
      });
  }

  ngAfterViewInit(): void {
    const edit = this.textBox.nativeElement;
    this.editor = new MediumEditor(edit);

    this.editableInputSub = this.editor.subscribe('editableInput', event => {
      if (event.data === '$') {
        this.renderToLatex();
      }
      const updatedDocument = this.editor.getContent();
      this.firestoreService.saveDocument(this.userId, updatedDocument);
      event.preventDefault();
    });
  }

  renderToLatex(): void {
    const editorDocument = this.editor.getContent();
    const equationExpressions = editorDocument.match(/\$.*?\$/g);
    if (equationExpressions) {
      const equationExpression = equationExpressions[0];
      const equation = equationExpression.substring(1, equationExpression.length - 1);
      const renderedLatex = renderToString(equation);
      const updatedDocument = editorDocument.replace(equationExpression, renderedLatex);
      this.editor.setContent(updatedDocument);
    }
  }

  ngOnDestroy(): void {
    this.editableInputSub.unsubscribe();
  }
}
