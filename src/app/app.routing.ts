import { Routes } from '@angular/router';
import { RouterGuard } from './core/guards/router.guard';

export const APP_ROUTES: Routes = [
    {
        path: 'inicio',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        data: { 'x-funcionalidad': 'base' },
        canActivate: [RouterGuard],
        canActivateChild: [RouterGuard],
    }
]