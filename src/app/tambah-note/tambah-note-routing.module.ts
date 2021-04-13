import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahNotePage } from './tambah-note.page';

const routes: Routes = [
  {
    path: '',
    component: TambahNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahNotePageRoutingModule {}
