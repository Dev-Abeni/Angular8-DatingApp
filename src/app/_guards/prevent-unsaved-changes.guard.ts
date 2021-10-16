import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MembersEditComponent } from "../members/members-edit/members-edit.component";

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MembersEditComponent>{
  canDeactivate(component: MembersEditComponent){
    if(component.editForm.dirty){
      return confirm("You have unsaved changes in the form. Are you sure you want to exit?");
    }

    return true;
  }

}
