import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoryDataResolverService} from './resolver/data/category-data-resolver.service';
import { ListDataResolverService} from './resolver/data/list-data-resolver.service';
import { DocumentDataResolverService} from './resolver/data/document-data-resolver.service';
import { MenuTitleResolverService} from './resolver/data/menu-title-resolver.service';
import { ListTitleResolverService} from './resolver/data/list-title-resolver.service';
import {AuthGuardService} from './services/auth/auth-guard.service';

const routes: Routes = [
  {path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
    { path: 'main',
        loadChildren: './main/main.module#MainPageModule',
       // canActivate: [AuthGuardService]
    },
    { path: 'side-menu', loadChildren: './side-menu/side-menu.module#SideMenuPageModule' },

  {
    path: 'second',
    loadChildren: () => import('./second/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'third',
    loadChildren: () => import('./third/third.module').then( m => m.ThirdPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'category/:id',
      resolve: {
          categoryData: CategoryDataResolverService,
          menuTitle: MenuTitleResolverService
      },
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'list/:id',
      resolve: {
          listData: ListDataResolverService,
          listTitle : ListTitleResolverService
      },
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'document/:id',
      resolve: {
          documentData: DocumentDataResolverService
      },
    loadChildren: () => import('./document/document.module').then( m => m.DocumentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
