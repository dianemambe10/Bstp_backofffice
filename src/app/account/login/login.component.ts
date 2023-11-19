import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/core/services/auth.service';
//import { AuthentificationService } from 'src/app/core/services/authentification.service';
//import { AuthenticationService } from 'src/app/core/services/auth.service';
//import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Login Component
export class LoginComponent {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  headerToken = {'Authorization': `Bearer `+ localStorage.getItem('access_token')};

  constructor(
              private formBuilder: UntypedFormBuilder,
              private authenticationService: AuthentificationService,
              private router: Router,
              private route: ActivatedRoute,
              public toastService: ToastrService,
              ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      //this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['diane@gmail.com', [Validators.required]],
      password: ['123456789', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // Login Api
    this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe({ next: (data: any) => {
      console.log(data)
      if (data && data.access) {
        localStorage.setItem('access_token',data.access);
        this.authenticationService.getUserProfile().subscribe((data: any) => {
          this.router.navigate(['/']);
        })
      }
    },error: (e) => {
          console.log(e.error.detail);
          this.toastService.error(e.error.detail, 'Erreur',{
            timeOut: 3000,
          })

    }

  });


    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
