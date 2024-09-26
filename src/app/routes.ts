import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const routesconfig: Routes =[
    {
        path:'',
        component:HomeComponent,
        title: 'Home pages'
    },
    {
        path: 'about',
        component:AboutComponent,
        title: 'AboutUs page'
    },
    {
        path: 'contact',
        component: ContactComponent,
        title:'Contact Page'
    },
    {
        path: 'product-details/:id',
        component:ProductDetailsComponent,
        title: 'Product Details Page'
    },
    {
        path:'sign-up',
        component: SignUpComponent,
        title: 'Sign Up to unlimited-shop'
    },
    {
        path:'sign-in',
        component: SignInComponent,
        title: 'Sign In to unlimited-shop'
    }
];
export default routesconfig;