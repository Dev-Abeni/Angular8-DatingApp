import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MembersEditComponent } from "./members/members-edit/members-edit.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { ListsResolver } from "./_resolvers/lists.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},

  // This is how to guard single route
  //{path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},

  // This is used to guard multiple routes in one path
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}},

      {path: 'member/edit', component: MembersEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChanges]
      },
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
    ]
  },

  // This wildcard redirects user to the home page which is identified by ''.
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
