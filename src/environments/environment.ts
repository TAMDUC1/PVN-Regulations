// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    coreUrl: 'http://222.255.250.162:8080',
    url : 'http://222.255.250.162:8080/api/NhomTL/getNhomTL?ParentID=',// get category nhom tai lieu
    urldocument :'http://222.255.250.162:8080/api/TaiLieu/getTaiLieuInfo?TailieuID=',
    url_search: 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=0&Page=1&RowPage=10&P_Search=',
    urldocumentmother: 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieuInfo?TailieuID=4257',// quan tri cong ty me
    urllist :'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=',
    authUrl : 'http://222.255.252.41/api/Auth/Login'

    /*
        urldungtam :'http://222.255.250.162:8080/api/NhomTL/getNhomTL?ParentID=6152',
    */
/*
    urllistdungtam : 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=6152&Page=1&RowPage=10&P_Search=',
*/
/*
    urldocumentdungtam : 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieuInfo?TailieuID=4257',
*/

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
