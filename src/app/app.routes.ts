import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { SignUp } from './sign-up/sign-up';
import { Deleted } from './deleted/deleted';
import { Expense } from './expense/expense';
import { HouseComponent } from './house/house';
import { Payment } from './payment/payment';
import { RenterComponent } from './renter/renter';
import { Activity } from './activity/activity';
import { SignInComponent } from './sign-in/sign-in';

export const routes: Routes = [
    { path: '', component:  SignInComponent},
    { path: 'dashboard', component:  Dashboard},
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUp },
    { path: 'deleted', component: Deleted },
    { path: 'expense', component: Expense },
    { path: 'house', component: HouseComponent },
    { path: 'payment', component: Payment },
    { path: 'renter', component: RenterComponent },
    { path: 'activity', component: Activity },
];
