import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, } from '@angular/router';
import { LoginService } from './login.service';

/*gaurds /admin access */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
    //if user is logged in and the user is admin then return true
    if (this.login.isLoggedIn() && this.login.getUserRole() == 'ADMIN') {
      return true;
    }

    //redirect to login
    this.router.navigate(['login']);

    return false;
  }
}