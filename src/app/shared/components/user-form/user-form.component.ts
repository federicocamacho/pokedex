import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Util } from '../../utils/util';
import { MustMatch } from '../../validators/must-match.validator';

@Component({
  selector: 'pk-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  @Input() user: User;
  @Output() submitted: EventEmitter<User> = new EventEmitter();
  @Input() submitAction: string;
  @Input() showCancel: boolean;
  @Output() cancelled: EventEmitter<any> = new EventEmitter();
  @Input() disableEmail: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [{ value: this.user?.email || '', disabled: this.disableEmail}, Validators.required],
      password: ['', Util.PASSWORD_VALIDATORS],
      name: [this.user?.name, Validators.required],
      passwordCheck: ['', [Validators.required]]
    }, { validators: MustMatch('password', 'passwordCheck') });
  }

  public submit(): void {
    const user = {
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      name: this.userForm.get('name').value
    };
    this.submitted.next(user);
  }

  public cancel(): void {
    this.cancelled.next(null);
  }

}
