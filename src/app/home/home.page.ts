import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalNoteService, Note } from '../global-note.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  noteList : Note[] = [];
  dataStorage : FileStorage[] = [];
  noteCol : AngularFirestoreCollection<Note>;

  noteFirestore : Observable<Note[]>;
  
  constructor(
    private router : Router, 
    private globalNote : GlobalNoteService, 
    private fireStore : AngularFirestore,
    private afStorage : AngularFireStorage
    ) {
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
    this.fetchData();

    //gagal
    for(var index in this.noteList){
      for(var index1 in this.noteList[index].gambar){
        for(var index2 in this.dataStorage){
          if(this.noteList[index].gambar[index1] == this.dataStorage[index2].filename){
            this.noteList[index].gambar[index1] = this.dataStorage[index2].urlImage
          }
        }
      }
    }

    console.log(this.noteFirestore)
    
  }

  tambahNote(){
    this.router.navigate(['tambah-note']);
  }

  fetchData(){
    this.dataStorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) =>{
        itemRef.getDownloadURL().then(url => {
          itemRef.getMetadata().then(meta=>{
            this.dataStorage.unshift({
              urlImage : url,
              filename : meta.name         
            });
          })
        })
        //console.log(this.dataStorage);
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  editData(id : string){
    this.noteCol.doc(id).update({
      judul : "judul_update",
      isi : "isi_update",
      tanggal : "tgl_update",
      nilai : "nilai_update"
    });
    
    console.log("Update berhasil");
  }

  hapusData(id : string){
    this.noteCol.doc(id).delete();
  }
}

export interface FileStorage{
  urlImage : string;
  filename : string;
}
