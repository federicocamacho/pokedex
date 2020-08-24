import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Util } from 'src/app/shared/utils/util';
import { MustMatch } from 'src/app/shared/validators/must-match.validator';

@Component({
  selector: 'pk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.profileForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Util.PASSWORD_VALIDATORS],
      name: ['', Validators.required],
      passwordCheck: ['', [Validators.required]]
    }, { validators: MustMatch('password', 'passwordCheck') });
  }

  public updateProfile(user: User): void {
    this.authService.user = user;
    const users = this.authService.createdUsers;
    const foundUser = users.find(usr => usr.email === user.email);
    if (foundUser) {
      foundUser.name = user.name;
      foundUser.password = user.password;
      this.authService.createdUsers = [ ...users ];
      this.messageService.showSuccess('Perfil actualizado correctamente.');
    }
  }

}
