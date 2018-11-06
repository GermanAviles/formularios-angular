import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';
//import { PageNotFoundComponent } from './';

const routes: Routes = [
    { path: '', component: DataComponent },
    { path: 'data', component: DataComponent },
    { path: 'template', component: TemplateComponent },
    { path: '**', component: TemplateComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    //"enableTracin: true" <--- solo para depuración.
    imports: [ 
        RouterModule.forChild(routes),
        RouterModule.forRoot(routes, { enableTracing: true }) 
     ],
    exports: [RouterModule]
})
export class AppModule {}
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
