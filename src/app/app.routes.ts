import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./container/container.component').then((m) => m.ContainerComponent),
    },
];
