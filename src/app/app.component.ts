import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
// @ts-ignore
import { SidemenuService } from './services/api/sidemenu.service';
import { CategoryDataService} from './services/data/category-data.service';
import { ListDataService} from './services/data/list-data.service';
import { DocumentDataService} from './services/data/document-data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService} from './services/auth/auth.service';
// @ts-ignore
import { environment } from '../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  authenticationState = new BehaviorSubject(false);

  selectedPath = '';
  public selectedIndex = 0;
  sideMenu: any = [];
  url = environment.url;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private sideMenuService: SidemenuService,
    private categoryData : CategoryDataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private listData : ListDataService,
    private documentData : DocumentDataService,
    private auth : AuthService
  ) {

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  openItemDetail(url, ObjectID,menuTitle) {
    var temp = url.toLowerCase();
    if (temp === 'detail') {
      temp = 'document';
    }
    // call api get category de truyen vao page temp
    if (temp === 'document') {// document quan tri cong ty me
      this.http.get(environment.urldocumentmother).subscribe((response) => {
        this.documentData.setData(ObjectID,response);
        this.router.navigateByUrl('/document/' + ObjectID);
      });
    } else {// list danh sach document
      if (temp == 'list') {
        let urlTemp = environment.urllist + ObjectID + '&Page=1&RowPage=10&P_Search=';
        this.http.get(urlTemp).subscribe((response) => {
          this.listData.setData(ObjectID,response,menuTitle);
          this.router.navigateByUrl('/list/' + ObjectID);
        });
      } else {// category danh sach list
        let urlTemp = this.url + ObjectID;
        this.http.get(urlTemp).subscribe((response) => {
          this.categoryData.setData(ObjectID,response);
            this.sideMenuService.setMenuCurrentTitle(menuTitle);
            this.router.navigateByUrl('/category/' + ObjectID);
        });
      }
    }


  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.sideMenu = this.sideMenuService.getSideMenu();
    });
  }
  /*ionViewDidLoad(){
              this.sideMenu = this.sideMenuService.getSideMenu();     
  }*/
  search() {
    this.router.navigate(['main']);

  }
  login() {
        this.router.navigate(['login']);

    }
  logOut(){
    this.auth.logout();
    this.router.navigate(['login']);
    /* await this.auth.signoutUser()
     .then(() => {
       if(){
         console.log("----- 1")
      //   this.ionicComponentService.presentToast("logged out",3000);
         //this.ionicComponentService.dismissLoading();
       //  this.router.navigateByUrl('/'+this.redirectUrl);

       }else{
         console.log("----- 2")
       //  this.ionicComponentService.presentToast("logged out",3000);
         //this.ionicComponentService.dismissLoading();
         this.router.navigateByUrl('/profile');

       }

     }, (error) => {
       var errorMessage: string = error.message;
       console.log("ERROR:"+errorMessage);
     //  this.ionicComponentService.presentToast(errorMessage,3000);
      // this.ionicComponentService.dismissLoading();

    // });


    }*/
  }
  ngOnInit() {
    /*const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }*/
    this.sideMenuService.getSideMenu();
    this.http.get('http://quychenoibo.pvn.vn/api/menu/Get_Menu_Mobile').subscribe((response) => {
      console.log('response', response);
      this.sideMenu = response;
      console.log('side', this.sideMenu);
    });
  }

}
