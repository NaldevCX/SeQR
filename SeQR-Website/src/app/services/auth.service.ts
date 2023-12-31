import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';
import * as firebase from 'firebase/compat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPopupComponent } from '../components/modal-popup/modal-popup.component';
import { MetamaskService } from './metamask.service';
import { interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  schoolName!: any;

  private isLoggedIn = false;
  constructor(private fireAuth: AngularFireAuth, private router: Router,
    private db: AngularFireDatabase, private logging: LoggingService,
    private MetamaskService: MetamaskService, private modalService: NgbModal) {
      const authToken = localStorage.getItem('idToken');
      this.isLoggedIn = !!authToken;
     }

  login(email: string, password: string){


  //METAMASK CALL
    if(this.MetamaskService.checkIfMetamaskInstalled()){
      this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
          user.user?.getIdToken().then(idToken => {
              // Store the token in local storage
              const userEmail = user.user?.email
              localStorage.setItem('idToken', idToken);
              if(userEmail){
                localStorage.setItem('idUserEmail', userEmail);
                this.logging.info(("User login: "+ localStorage.getItem('idUserEmail')));
              }else{
                localStorage.setItem('idUserEmail', "Guest Account");
                this.logging.info(("User login: "+ localStorage.getItem('idUserEmail')));
              }


              localStorage.getItem('idToken');
              this.router.navigateByUrl('dashboard');
          });
      }, (err): void => {
          this.logging.error("Login Failed, reason: might be forms related.", err);
          const modalRef = this.modalService.open(ModalPopupComponent);
          modalRef.componentInstance.message = "The email or password is incorrect";

          this.router.navigateByUrl('/login');

      });
    }else{

      const modalRef = this.modalService.open(ModalPopupComponent);
      modalRef.componentInstance.message = "Metamask not detected, please install metamask before logging in. If you're on mobile, Metamask is not yet supported on the browser. Please switch to a Computer Device.";
      setTimeout(() => {
        window.open('https://metamask.io', '_blank', 'noopener,noreferrer');
      }, 1500);


    }
  }

  logout(){
    this.isLoggedIn = false;
    this.fireAuth.signOut().then(()=>{
      this.logging.info("User logout: " + localStorage.getItem('idUserEmail'));
      localStorage.removeItem('idToken');
      localStorage.removeItem('idUserEmail');
      this.router.navigateByUrl('login');
    }, err =>{
      this.logging.error("Error, no existing session ID.", err);
      alert(err.message);
    }
    )
  }

  register(email: any, password: any, name: any){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      // Get the user's ID token
      return user.user?.getIdToken().then(idToken => {
        // Write the new user's name and ID token to the Realtime Database
        this.db.database.ref(`users/${user.user?.uid}`).set({
          name,
          idToken
        });
      });
    });
  }

  getSchoolName(){
    this.fireAuth.user.subscribe(user => {
      if (user) {
        // User is signed in
        // Get the user's UID
        const uid = user.uid;
        // Reference the user's name in the Realtime Database
        const nameRef = this.db.object(`users/${uid}/name`);

        // Read the user's name from the Realtime Database
        nameRef.valueChanges().subscribe(name => {
          this.schoolName = name;
        });
      } else {
        // User is signed out
      }
    })
  }


   resetPassword(email: any){

    return this.fireAuth.sendPasswordResetEmail(email).then(() => {
      const modalRef = this.modalService.open(ModalPopupComponent);
      modalRef.componentInstance.message = "Email has been sent! Check your email." ;
    })
    .catch((error) => {
      const modalRef = this.modalService.open(ModalPopupComponent);
      modalRef.componentInstance.message = "There is no user record corresponding to this identifier. The user may not have existed or has been deleted. " ;

    });
  }

  checkLogin(): boolean {
    const authToken = localStorage.getItem('idToken');
    this.isLoggedIn = !!authToken;
    return this.isLoggedIn;
  }



}
