import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahNotePageRoutingModule } from './tambah-note-routing.module';

import { TambahNotePage } from './tambah-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahNotePageRoutingModule
  ],
  declarations: [TambahNotePage]
})
export class TambahNotePageModule {}
