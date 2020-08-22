import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'pk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  public login(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const users: User[] = this.authService.createdUsers;
    if (users) {
      const foundUser = users.find(user => user.email === email && user.password === password);
      if (foundUser) {
        this.authService.user = foundUser;
        this.router.navigate(['/pokedex']);
        return;
      }
    }

    this.messageService.showError('Nombre de usuario o contraseña incorrectos');
  }

}
