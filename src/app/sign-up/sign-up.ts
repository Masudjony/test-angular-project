

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signupForm: FormGroup;
  strengthBars = [
    { filled: false, requirement: 'minLength' },
    { filled: false, requirement: 'uppercase' },
    { filled: false, requirement: 'number' },
    { filled: false, requirement: 'specialChar' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    });

    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      this.updateStrengthBars(value);
    });
  }

  updateStrengthBars(password: string) {
    this.strengthBars[0].filled = password?.length >= 8;
    this.strengthBars[1].filled = /[A-Z]/.test(password);
    this.strengthBars[2].filled = /[0-9]/.test(password);
    this.strengthBars[3].filled = /[^A-Za-z0-9]/.test(password);
  }

  getStrengthPercentage(): number {
    const filledCount = this.strengthBars.filter(b => b.filled).length;
    return (filledCount / this.strengthBars.length) * 100;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
    }
  }
}