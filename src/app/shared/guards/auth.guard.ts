import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,







  CanActivate, Router,
  RouterStateSnapshot,

  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isUserNotLoggedIn();
  }

  private isUserNotLoggedIn(): boolean {
    if (!this.authService.user) {
      return true;
    }

    this.router.navigate(['/pokedex']);
    return false;
  }
}
