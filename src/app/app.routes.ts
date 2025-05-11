import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path:'posts', loadComponent: () => import('./components/posts/posts.component').then(m => m.PostsComponent)},
    { path:'posts/:id', loadComponent: () => import('./components/post-details/post-details.component').then(m => m.PostDetailsComponent)},
];
