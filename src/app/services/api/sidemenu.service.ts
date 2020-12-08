import { Injectable } from '@angular/core';
import { ISideMenu} from '../../model/sidemenu';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';


let headers : HttpHeaders = new HttpHeaders();
const newHeaders = new HttpHeaders().set("X-CustomHeader", "custom header value")
    .append('Content-Type', 'application/json')
    .append("'Access-Control-Allow-Origin", "*")
    .append("Accept", "application/json")
    .append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

headers.append('','');
const httpOptions = {
    headers: newHeaders
};

@Injectable({
  providedIn: 'root'
})

export class SidemenuService {
  private sideMenu = [];
  private currentMenu = '';
  constructor(private http: HttpClient) { }
  getSideMenu = function () {
      this.http.get('http://quychenoibo.pvn.vn/api/menu/Get_Menu_Mobile').subscribe((response) => {
          this.sideMenu = response;
          this.sideMenu.forEach(e =>{
              e.category = [];
          })
      });

  }
  getMenu = function () {
      console.log('side',this.sideMenu);
  }
  setMenuCurrentTitle(title){
      this.currentMenu = title;
  }
  getMenuCurrentTitle(){
      return this.currentMenu;
  }

}
