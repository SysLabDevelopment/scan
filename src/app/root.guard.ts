import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  constructor( private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('can_activate_call');
    let url = next.routeConfig.path;
    let id  = localStorage.getItem('id');

    console.log('guard_params', url, id);
    if (url == "draw") {
      if (!id) return false;
    }

    return true;
  }
}
