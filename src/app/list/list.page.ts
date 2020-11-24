import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { environment } from '../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';
import { DocumentDataService} from '../services/data/document-data.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
    data: any;
    url = environment.urldocument;
    key_search:string = "";
    loading;
    url_search = environment.url_search;
    title = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loadingCtrl: LoadingController,
        private http: HttpClient,
        public toastController: ToastController,
        public documentData : DocumentDataService,
        private navCtrl: NavController

    ) {
        this.route.queryParams.subscribe(params => {
            console.log('this params', params);
            if (params && params.title) {
                this.title = params.title;

            }
        });
    }

    ngOnInit() {
        if (this.route.snapshot.data['listData']) {
            this.data = this.route.snapshot.data['listData'];
            console.log('listData',this.data);
        }
        if (this.route.snapshot.data['listTitle']) {
            this.title = this.route.snapshot.data['listTitle'];
        }

    }
    viewData(id) {

        this.http.get(this.url + id).subscribe((response) => {
            this.documentData.setData(id,response);

            if(response){
                this.router.navigateByUrl('/' + 'document' + '/' + id);
            }
        });

    }
    async seach_text() {
        /* 
        *  Process search by key and navigation to list page
        */
        console.log('vao ham')
        await this.loadingCtrl.create({
          message: "Loading...",
          duration: 2000
        }).then((overlay) => {
          this.loading = overlay;
          this.loading.present();
        });
        let url_search = this.url_search + this.key_search; // sau nay dung link nay
        var data: any = []
        this.http.get(url_search).subscribe((response) => {
          console.log(response);
          data = response;
          this.loading.dismiss();
          if (data.length == 0) {
            this.data = response;
            this.presentToast(`Không có kết qủa tìm kiếm`)
          }
          else {
            this.data = response
          }
        }, er => {
          this.loading.dismiss();
        });
      }
      async presentToast(message) {
        const toast = await this.toastController.create({
          message: message,
          duration: 1500
        });
        toast.present();
      }
    gotoBack() {
        this.navCtrl.back();

    }
}
