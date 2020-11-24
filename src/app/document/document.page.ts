import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Platform, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { DocumentDataService } from '../services/data/document-data.service';
import { NavController } from '@ionic/angular';
import {Plugins, FilesystemDirectory} from '@capacitor/core';
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {HTTP} from "@ionic-native/http/ngx";

const { Filesystem } = Plugins;
@Component({
    selector: 'app-document',
    templateUrl: './document.page.html',
    styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
    pdfObj = null;
    src;
    ParentID;
    data: any = {
        "TieuDe": "",
        "MaTaiLieu": "",
        "NgayBanHanh": "",
        "GhiChu": "",
        "TrangThai": "",
        "NoiDung": ""
    };
    @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
    callBackFn(event) {
        console.log('callBackFn', event);
    }
    vanbanlienquan = [];
    private loading;
    type: string;
    url = environment.urldocument;
    coreUrl = environment.coreUrl;
    title = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private platform: Platform,
        private file: File,
        private ft: FileTransfer,
        private fileOpener: FileOpener,
        private document: DocumentViewer,
        private loadingCtrl: LoadingController,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        public documentData: DocumentDataService,
        private navCtrl: NavController,
        private _nativeHttp: HTTP

    ) {

        /* this.route.queryParams.subscribe(params => {
             if (this.router.getCurrentNavigation().extras.state) {
                 this.data = this.router.getCurrentNavigation().extras.state.document;
                 console.log('data document', this.data);
             }
         });*/

    }
    async ngOnInit() {
        //  this.data.test = '<a class="show-item" href="document#4254">Nghi định 100 QBTC</a>'
        //  console.log('ParentID', this.ParentID);
        this.type = 'info';
        if (this.route.snapshot.data['documentData']) {
            this.data = this.route.snapshot.data['documentData'];
             console.log('data new', this.data);
        }
        else {
            this.type = 'content';
            await this.loadingCtrl.create({
                message: "Loading...",
                duration: 2000
            }).then((overlay) => {
                this.loading = overlay;
                this.loading.present();
            });
            this.url = this.url + this.route.snapshot.params.id; // sau nay dung link nay
            this.http.get(this.url).subscribe((response) => {
                this.loading.dismiss();
                this.data = response;
            }, er => {
                this.loading.dismiss();
            });
        }

    }
    // ngAfterViewInit() {
    //     this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
    //         if (event.toElement.className == 'show-item') {
    //             var href_ls = event.toElement.hash.split("#");
    //             var document_id = href_ls[href_ls.length - 1];
    //             this.referenceLink(document_id)
    //         }
    //     })
    // }
    // async referenceLink(document_id) {
    //     /* 
    //     *  Process search and navigation to document page
    //     */
    //     this.router.navigateByUrl('/' + 'document' + '/' + document_id);
    //     // await this.loadingCtrl.create({
    //     //      message : "Loading...",
    //     //      duration: 2000
    //     // }).then((overlay)=>{
    //     //     this.loading = overlay;
    //     //     this.loading.present();
    //     // });
    //     // console.log(document_id);
    //     // this.url = this.url + document_id; // sau nay dung link nay
    //     // this.http.get(this.url).subscribe((response) => {
    //     //     this.loading.dismiss();
    //     //     this.data = response;
    //     // }, er => {
    //     //     this.loading.dismiss();
    //     // });
    // }
    viewDoc(docUrl, name) {
        //var fileName = name.trim();
        var finalUrl = this.coreUrl + docUrl;
        if (this.platform.is('ios'))
        {
            console.log('name', name);
            //var fileName = name.trim();
            this.loadingCtrl.create({
                message: "Loading..."
            }).then((overlay) => {
                this.loading = overlay;
                this.loading.present();
            });
            const transfer = this.ft.create();
            let path = this.file.dataDirectory;
            // doc bang viewDocument
            transfer.download(finalUrl, path + 'file.pdf').then(entry => {
                let url = entry.toURL();
                this.loading.dismiss();
                this.document.viewDocument(url, 'application/pdf', {}, this.onShow, this.onClose, this.onMissingApp, this.onError);
            })
        }
            else{
            var downloadPath = this.file.dataDirectory + 'file.pdf';
            this.doDownloadToDevice(finalUrl,downloadPath);
        }
    }


    onShow() {
        console.log('onShow');

    }
    onMissingApp() {

    }
    onClose() {
        console.log('onClose');
        //  this.loading.dismiss();
        window.console.log('document closed');
        //e.g. remove temp files
    }

    onError() {
        console.log('errrrrr');
    }
    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
    }
    gotoBack() {
        this.navCtrl.back();

    }
    gotoDoc(id){
        console.log(id);
        this.router.navigateByUrl('/' + 'document' + '/' + id);
    }
    doDownloadToDevice(url, downloadPath):void {
        this._nativeHttp.downloadFile(url, {}, {}, downloadPath)
            .then((response) => {
                // @ts-ignore
              //  var temp = response.
                this.fileOpener.open(response.nativeURL, 'application/pdf');

            }, (e) => {
                console.warn("Download error", e);
            });
    }
}
