import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentPageRoutingModule } from './document-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DocumentPage } from './document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentPageRoutingModule,
      PdfViewerModule

  ],
  declarations: [DocumentPage]
})
export class DocumentPageModule {}
