import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ListDataService} from '../services/data/list-data.service';
// @ts-ignore
import {environment} from '../../environments/environment';
import {LoadingController, ToastController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {CategoryDataService} from '../services/data/category-data.service';
import {SidemenuService} from '../services/api/sidemenu.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  ParentID;
  data : any;
  url = environment.urllist;
    loading;
    url_search = environment.url_search;
    key_search:string = "";
    menuTitle = '';
    constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private listData : ListDataService,
                private loadingCtrl: LoadingController,
                public toastController: ToastController,
                private navCtrl: NavController,
                private sideMenuService: SidemenuService,
                private categoryData : CategoryDataService,


    ) {
      this.route.queryParams.subscribe(params => {
        console.log(this.router.getCurrentNavigation())
          if (this.router.getCurrentNavigation().extras.state) {
              this.data = this.router.getCurrentNavigation().extras.state.category;
              console.log('data category 1', this.data);
          }
      });
  }

    ngOnInit() {
        if (this.route.snapshot.data['categoryData']) {
            this.data = this.route.snapshot.data['categoryData'];
        }
        if (this.route.snapshot.data['menuTitle']) {
            this.menuTitle = this.route.snapshot.data['menuTitle'];
        }
    }
    search(){
        this.router.navigate(['main']);
    }
    viewList (id,title,hasChild){
      // thay IdNhom
        //urllistdungtam : 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=6152&Page=1&RowPage=10&P_Search='
        var tempId = id.toString();
        if(hasChild){
            console.log('child',hasChild);
            let urlTemp = environment.url + id;
            this.http.get(urlTemp).subscribe((response) => {
                this.categoryData.setData(id,response);
                this.sideMenuService.setMenuCurrentTitle(title);
                this.router.navigateByUrl('/category/' + id);
            });
        }else{
            var finalUrl = this.url + tempId +'&Page=1&RowPage=10&P_Search=';
            this.http.get(finalUrl).subscribe((response) => {
                this.listData.setData(tempId,response,title);
                this.router.navigateByUrl('/list/' + tempId);
            });
        }
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
        let url = environment.url_search + this.key_search; // sau nay dung link nay
        var data: any = []
        this.http.get(url).subscribe((response) => {
            this.listData.setData('0',response,'');
            data = response;
            this.loading.dismiss();
            if (data.length == 0) {
                this.presentToast(`Không có kết qủa tìm kiếm`)
            }
            else {
                this.key_search="";
                this.router.navigateByUrl('/' + 'list' + '/' + '0');
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
