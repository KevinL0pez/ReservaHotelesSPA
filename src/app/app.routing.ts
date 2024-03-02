import { Routes } from '@angular/router';
import { RouterGuard } from './core/guards/router.guard';
// import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
    {
        path: 'inicio',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        data: { 'x-funcionalidad': 'inicio' },
        canActivate: [RouterGuard],
        canActivateChild: [RouterGuard],
    },
    {
        path: 'inicio-sesion',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
        data: { 'x-funcionalidad': 'inicio-sesion' },
        canActivate: [RouterGuard],
        canActivateChild: [RouterGuard]
    },
    {
        path: 'registro',
        loadChildren: () => import('./modules/register/register.module').then((m) => m.RegisterModule),
        data: { 'x-funcionalidad': 'registro' },
        canActivate: [RouterGuard],
        canActivateChild: [RouterGuard]
    },
    // {
    //     path: '',
    //     component: AppComponent,
    //     pathMatch: 'full',
    // },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
]