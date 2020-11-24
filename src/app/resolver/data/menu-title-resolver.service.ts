import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SidemenuService} from '../../services/api/sidemenu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuTitleResolverService implements Resolve<any>{

  constructor(private dataService : SidemenuService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.dataService.getMenuCurrentTitle();
    }
}
