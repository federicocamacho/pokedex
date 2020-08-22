import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get user(): User {
    try {
      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        return JSON.parse(userJSON);
      }
      return null;
    }
    catch (error) {
      return null;
    }
  }

  public set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get createdUsers(): User[] {
    try {
      const usersJSON = localStorage.getItem('users');
      if (usersJSON) {
        return JSON.parse(usersJSON);
      }
      return [];
    }
    catch (error) {
      return [];
    }
  }

  public set createdUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  constructor() { }
}
