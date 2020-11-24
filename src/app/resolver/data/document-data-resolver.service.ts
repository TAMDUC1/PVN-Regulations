import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DocumentDataService} from '../../services/data/document-data.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentDataResolverService implements Resolve<any> {

  constructor(private dataService : DocumentDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.paramMap.get('id');
        return this.dataService.getData(id);
    }
}
