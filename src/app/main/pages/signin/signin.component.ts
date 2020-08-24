import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'pk-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private authSerivce: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public signin(user: User): void {
    const users = this.authSerivce.createdUsers;
    if (users) {
      // validate that the user doesn't exist yet
      const foundUser = users.find(usr => usr.email === user.email);
      if (foundUser) {
        this.messageService.showError('Este correo electrónico ya se encuentra registrado.');
        return;
      }
    }
    users.push(user);
    this.authSerivce.createdUsers = [ ...users ];
    this.authSerivce.user = user;
    this.router.navigate(['/pokedex']);
  }

  public cancel(): void {
    this.router.navigate(['/login']);
  }

}
