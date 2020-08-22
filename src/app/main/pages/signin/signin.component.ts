import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'pk-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authSerivce: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      passwordCheck: ['', Validators.required]
    });
  }

  public signin(): void {
    const users = this.authSerivce.createdUsers;
    const email = this.signinForm.get('email').value;
    if (users) {
      // validate that the user doesn't exist yet
      const foundUser = users.find(usr => usr.email === email);
      if (foundUser) {
        this.messageService.showError('Este correo electrónico ya se encuentra registrado.');
        return;
      }
    }

    const user = {
      email,
      password: this.signinForm.get('password').value,
      name: this.signinForm.get('name').value
    };
    users.push(user);
    this.authSerivce.createdUsers = [ ...users ];
    this.authSerivce.user = user;
    this.router.navigate(['/pokedex']);
  }

}
