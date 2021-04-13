import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalNoteService, Note } from '../global-note.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-tambah-note',
  templateUrl: './tambah-note.page.html',
  styleUrls: ['./tambah-note.page.scss'],
})
export class TambahNotePage implements OnInit {

  judul : string;
  isi : string;
  tanggal : string;
  nilai : string;
  note : Note;
  noteCol : AngularFirestoreCollection<Note>;

  constructor(private router : Router, private globalNote : GlobalNoteService,private fireStore : AngularFirestore) {
    this.noteCol = this.fireStore.collection<Note>('Note');
  }

  ngOnInit() {}

  tambahNote(){
    this.note = {
      id : 'N_' + this.judul + '_' + this.nilai,
      judul : this.judul,
      isi : this.isi,
      tanggal : this.tanggal,
      nilai : this.nilai,
      gambar : "0"
    }
    this.globalNote.addNote(this.note);
    this.noteCol.doc(this.note.id).set(this.note);
    this.router.navigate(['home']);
    this.clear();
  }

  clear(){
    this.judul = "";
    this.isi = "";
    this.tanggal = "";
    this.nilai = "";
  }

}
