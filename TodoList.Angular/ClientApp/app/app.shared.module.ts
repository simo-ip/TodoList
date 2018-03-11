import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        TodoComponent,
        AboutComponent,
        ContactComponent
    ],
    providers: [
        TodoService
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'todo/:id', component: TodoComponent },
            { path: 'todo', redirectTo: 'todo/1', pathMatch: 'full' },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
