import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RootGuard } from './root.guard';
const routes: Routes = [
  { path: '', redirectTo: 'password', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'scan', loadChildren: './scan/scan.module#ScanPageModule' , },
  { path: 'draw', loadChildren: './draw/draw.module#DrawPageModule' , canActivate: [RootGuard]},
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
