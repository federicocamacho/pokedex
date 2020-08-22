import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';

@Component({
  selector: 'pk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Subscribable implements OnInit {

  public searchForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
      super();
    }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  private getSearchCriteria(): string {
    return this.searchForm.get('search').value;
  }

  public logout(): void {
    this.authService.user = null;
    this.router.navigate(['/login']);
  }

  public goToHome(): void {
    this.router.navigate(['/pokedex']);
  }

  public search(): void {
  }
}
