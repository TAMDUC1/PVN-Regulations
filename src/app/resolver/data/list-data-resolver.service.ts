import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { ListDataService} from '../../services/data/list-data.service';

@Injectable({
  providedIn: 'root'
})
export class ListDataResolverService implements Resolve<any> {

  constructor(private dataService: ListDataService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.paramMap.get('id');
        return this.dataService.getData(id);
  }

}
