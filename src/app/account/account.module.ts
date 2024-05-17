import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// Page Route
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

// Component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AlertModule} from "ngx-bootstrap/alert";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        AuthModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule
    ]
})
export class AccountModule { }
