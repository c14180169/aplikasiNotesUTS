import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalNoteService {

  noteList : Note[] = [];

  constructor() { }

  getNoteList(){
    return [...this.noteList];
  }

  addNote(temp : Note){
    this.noteList.push(temp)
  }

}

export interface Note {
  id : string;
  judul : string;
  isi : string;
  tanggal : string;
  nilai : string;
  gambar : string;
}