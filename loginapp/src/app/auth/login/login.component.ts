import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  })

  loading = false

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credentials = this.loginForm.value
    this.loading = true
    this.authService.login(credentials)
      .subscribe(
        user => {
          console.log(user)
          this.snack.open('Login in successfuly. Welcome ' + user.firstname + '!', 'OK', {duration: 2000})
          this.router.navigateByUrl('/')
          this.loading = false
        },
        err => {
          console.log(err)
          this.snack.open('Login error', 'OK', {duration: 2000})
          this.loading = false
        }
      )
  }

}
