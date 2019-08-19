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

    switch (url) {
      case 'draw':
          if (!id) return false;
        break;
      case 'home':
        if (id) return false;
        break;   
    }

    return true;
  }
}
