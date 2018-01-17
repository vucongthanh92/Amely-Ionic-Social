import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { PersonalMenuComponent } from './personal-menu/personal-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonalComponent, PersonalMenuComponent]
})
export class PersonalModule { }
