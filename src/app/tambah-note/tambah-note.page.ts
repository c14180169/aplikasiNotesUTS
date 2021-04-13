import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalNoteService, Note } from '../global-note.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { FotoService, Photo } from '../foto.service';

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
  tempfilepath : string[] = [];
  noteCol : AngularFirestoreCollection<Note>;

  constructor(
    private router : Router, 
    private globalNote : GlobalNoteService,
    public fotoService : FotoService,
    private fireStore : AngularFirestore,
    private afStorage : AngularFireStorage,
    public toastController : ToastController
    ) {
    this.noteCol = this.fireStore.collection<Note>('Note');
  }

  ngOnInit() {}

  tambahFoto(){
    this.fotoService.tambahFoto();
  }

  upload(){
    for(var index in this.fotoService.dataFoto) {
      this.tempfilepath.push(this.fotoService.dataFoto[index].filePath);
      const imgFilePath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      this.afStorage.upload(imgFilePath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url) => {
          this.tempfilepath.push(url)
          console.log(this.tempfilepath)
          this.presentToast("Upload Successful");
        })
      })
    }
    this.fotoService.dataFoto = []
  }

  tambahNote(){
    this.note = {
      id : 'N_' + this.judul + '_' + this.nilai,
      judul : this.judul,
      isi : this.isi,
      tanggal : this.tanggal,
      nilai : this.nilai,
      gambar : this.tempfilepath
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

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
