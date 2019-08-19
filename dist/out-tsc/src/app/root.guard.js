import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let RootGuard = class RootGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(next, state) {
        console.log('can_activate_call');
        let url = next.routeConfig.path;
        let id = localStorage.getItem('id');
        console.log('guard_params', url, id);
        switch (url) {
            case 'draw':
                if (!id)
                    return false;
                break;
            case 'home':
                if (id)
                    return false;
                break;
        }
        return true;
    }
};
RootGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], RootGuard);
export { RootGuard };
//# sourceMappingURL=root.guard.js.map