import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { CategoryDataService } from '../../services/data/category-data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataResolverService implements Resolve<any> {

  constructor(private dataService: CategoryDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.paramMap.get('id');
        return this.dataService.getData(id); }
}
