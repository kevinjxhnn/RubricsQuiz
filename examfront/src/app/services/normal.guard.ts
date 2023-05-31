import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


/*gaurds /user-dashboard access */

@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    //if user is logged in and the user is normal then return true
    if (this.login.isLoggedIn() && this.login.getUserRole() == 'NORMAL') {
      return true;
    }

    //if not redirect to login
    this.router.navigate(['login']);
    return false;
  }
}

