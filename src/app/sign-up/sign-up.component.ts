import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule] // Add ReactiveFormsModule here
})
export class SignUpComponent {
  signUpForm: FormGroup;
  loader: boolean = false;
  feedbackMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.loader = true;
    this.feedbackMessage = '';

    const formData = {
      email: this.signUpForm.get('email')?.value,
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value,
      name: {
        firstname: this.signUpForm.get('firstname')?.value,
        lastname: this.signUpForm.get('lastname')?.value,
      },
      address: {
        city: this.signUpForm.get('city')?.value,
        street: this.signUpForm.get('street')?.value,
        number: this.signUpForm.get('number')?.value,
        zipcode: this.signUpForm.get('zipcode')?.value,
        geolocation: {
          lat: '-37.3159',  // Dummy value
          long: '81.1496'   // Dummy value
        }
      },
      phone: this.signUpForm.get('phone')?.value
    };

    this.http.post('https://fakestoreapi.com/users', formData).subscribe({
      next: (response) => {
        console.log(response);
        this.feedbackMessage = 'Signup successful!';
        this.loader = false;
        this.signUpForm.reset();
      },
      error: (error) => {
        this.feedbackMessage = 'Error during signup. Please try again.';
        this.loader = false;
      }
    });
  }
}
