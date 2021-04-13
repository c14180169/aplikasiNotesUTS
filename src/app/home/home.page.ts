import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalNoteService, Note } from '../global-note.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  noteList : Note[] = [];
  noteCol : AngularFirestoreCollection<Note>;

  noteFirestore : Observable<Note[]>;
  
  constructor(private router : Router, private globalNote : GlobalNoteService, private fireStore : AngularFirestore) {
    this.noteCol = this.fireStore.collection<Note>('Note');

    this.noteFirestore = this.noteCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        })
      })
    )
  }

  ngOnInit(){
    this.noteList = this.globalNote.getNoteList()
  }

  tambahNote(){
    this.router.navigate(['tambah-note']);
  }
}
