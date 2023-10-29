import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './Login';
import { RestService } from '../rest.service';
import { UserService } from '../user.service'; // Import the UserService

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup; // Declare a FormGroup
    loginData: Login = new Login();
    users: { username: string; password: string }[] = [];
    valid = true;
    @ViewChild('uname') usernameElement!: ElementRef;

    constructor(private router: Router, private fb: FormBuilder, private restService: RestService, private userService: UserService) {
      this.loginForm = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(3)]], // Add validators
        password: ['', [Validators.required, Validators.minLength(6)]] // Add validators
      });
    }


    ngOnInit() {}

    // Invoked when the user clicks submit in the login form
    // Validates the credentials with the data fetched from the backend
    onSubmit() {
      // Get the values from the form controls
      const submittedUsername = this.loginForm.get('userName')?.value;
      const submittedPassword = this.loginForm.get('password')?.value;
      
      // Check user data validity using RestService
      this.restService.checkUserData(submittedUsername, submittedPassword).subscribe((isValid) => {
        if (isValid) {
          this.userService.setUsername(submittedUsername);
          alert('Login successful!');
          this.router.navigate(['/book-ride-component']);
        } else {
          alert('Login failed. Please check your username and password.');
          this.valid = false;
        }
      });
    }
      
}
