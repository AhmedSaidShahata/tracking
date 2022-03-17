export class ApiLinks {
  public static IS_PRODUCTION = true;
  public static MAIN_LINK = ApiLinks.getProjectAPiLink();
  public static IMAGE_LINK = ApiLinks.getImagesLink();
  public static USERS = ApiLinks.MAIN_LINK + 'users/';
  public static LOGIN = ApiLinks.USERS + 'login';


  public static LANG = ApiLinks.getLocal();


  public static DASHBOARD_COUNTERS = ApiLinks.MAIN_LINK + 'dashboard_counters';
  public static SALESMEN = ApiLinks.MAIN_LINK + 'salesmen';
  public static CHANGE_SALESMAN_ACTIVE_STATE = ApiLinks.MAIN_LINK + 'change_salesman_active_state';
  public static FORGET_PASSWORD = ApiLinks.MAIN_LINK + 'users/forget_password';
  public static VERIFY_PASSWORD_CODE = ApiLinks.MAIN_LINK + 'verify_password_code';
  public static CHANGE_FORGOTEN_PASSWORD = ApiLinks.MAIN_LINK + 'users/change_forget_password';
  public static ASSET_LOOKUP = ApiLinks.MAIN_LINK + "assets/lookup";
  public static ASSET_EMP = ApiLinks.MAIN_LINK + "employees/assets/";
  public static ASSET_STATUS = ApiLinks.MAIN_LINK + "employees/assets/change_status/";
  public static ASSET = ApiLinks.MAIN_LINK + "assets";
  public static ASSETEXCEL = ApiLinks.MAIN_LINK + "assets/assetsexcel";
  public static MAIN_CATEGORIES = ApiLinks.MAIN_LINK + "main_categories";
  public static CATEGORIES = ApiLinks.MAIN_LINK + "categories";
  public static LOCATIONS = ApiLinks.MAIN_LINK + "locations";
  public static TOWERS = ApiLinks.MAIN_LINK + "towers";
  public static FLOORS = ApiLinks.MAIN_LINK + "floors";
  public static FILTER_ASSETS = ApiLinks.MAIN_LINK + "assets/filter_assets";

  public static UNASSAIN_ASSETS = ApiLinks.MAIN_LINK + "assets/un_assign";
  public static ASSAIN_ASSETS = ApiLinks.MAIN_LINK + "assets/assign";
  public static ASSAIN_addMultiAsset = ApiLinks.MAIN_LINK + "assets/addMultiAsset";
  public static ROLES = ApiLinks.MAIN_LINK + "roles";
  public static ROOMS = ApiLinks.MAIN_LINK + "rooms";
  public static NATIONALITIES = ApiLinks.MAIN_LINK + "nationalities";
  public static JOBS = ApiLinks.MAIN_LINK + "jobs";
  public static EMPLOYEES = ApiLinks.MAIN_LINK + "employees";
  public static DEPARTMENTS = ApiLinks.MAIN_LINK + "departments";
  public static MODEL = ApiLinks.MAIN_LINK + "models";
  public static SESSION_CYCLE = ApiLinks.MAIN_LINK + "sessioncycle";
  public static CHANGE_PASSWORD = ApiLinks.EMPLOYEES + "/change_password";
  public static CHANGE_USER_PASSWORD = ApiLinks.MAIN_LINK + "users/update_user_password";


  public static getProjectAPiLink() {
    return this.getProjectBaseLink() + 'public/index.php/web_api/v1/';

  }

  private static getImagesLink() {
    return this.getProjectBaseLink() + "storage/app/";

  }

  public static getProjectBaseLink() {
    if (this.IS_PRODUCTION) {
      //  return "https://10.50.11.27/project/";
 return "https://assetmanagement.gazt.gov.sa/project/";
//    return "http://assettracking.appsgateway.website/project/";
      //  return "https://ams.gazt.gov.sa/project/";
      //   return "http://localhost/project/";
      // return "https://mobility.cybermak.net:446/project/";
    } else {
      return "http://localhost/project/";

      // return "http://localhost/AssetTracking/";
    }
  }


  public static loadjscssfile(filename, filetype) {
    let fileref = null;
    if (filetype == "js") { //if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype == "css") { //if filename is an external CSS file
      fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref);
  }

  public static getLocal() {
    let lang = localStorage.getItem('lang');

    if (lang == "" || lang == null || lang == "null") {
      lang = "en";
    }

    if (lang == "ar") {
      ApiLinks.loadjscssfile("assets/css/style.css", "css");

    } else {
      ApiLinks.loadjscssfile("assets/css2/style.css", "css");
    }


    return lang;
  }


}




