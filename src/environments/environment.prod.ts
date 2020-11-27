export const environment = {
  production: true,
  coreUrl: 'http://222.255.250.162:8080',
  url : 'http://222.255.250.162:8080/api/NhomTL/getNhomTL?ParentID=',// get category nhom tai lieu
  urldocument :'http://222.255.250.162:8080/api/TaiLieu/getTaiLieuInfo?TailieuID=',
  url_search: 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=0&Page=1&RowPage=10&P_Search=',
  urldocumentmother: 'http://222.255.250.162:8080/api/TaiLieu/getTaiLieuInfo?TailieuID=4257',// quan tri cong ty me
  urllist :'http://222.255.250.162:8080/api/TaiLieu/getTaiLieu?IdNhom=',
  authUrl : 'http://222.255.252.41/api/Auth/Login'
};
