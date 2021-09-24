import { User } from './../user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    'firstname': ['', [Validators.required]],
    'lastname': ['', [Validators.required]],
    'address': ['', [Validators.required]],
    'city': ['', [Validators.required]],
    'state': ['', [Validators.required]],
    'phone': ['', [Validators.required]],
    'mobilephone': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]],
  }, { Validator: this.matchingPasswords} )

  states = ["MG", "RS", "SC", "GO", "PR", "SP", "RJ"]

  constructor(private fb: FormBuilder, private authService: AuthService, private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['passoword1'].value
      const password2 = group.controls['passoword2'].value
      if (password1 == password2) {
        return null
      }
    }
    return {matching: false}
  }

  onSubmit() {
    console.log(this.formRegister.value)
    let u: User = { ...this.formRegister.value, password: this.formRegister.value.password1 }
    this.authService.register(u)
      .subscribe(
        (u) => {
          this.snack.open('Sucessfuly registered. Use your credentials to sign in', 'OK', {duration: 2000})
          this.router.navigateByUrl('auth/login')
        },
        (err) => {
          console.log(err)
          this.snack.open(err.error.message, 'OK', {duration: 2000})
        }
      )
  }

}
