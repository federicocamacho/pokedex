import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'pk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    const search = this.route.snapshot.queryParams.search;
    this.searchForm = this.formBuilder.group({
      search: [search || '']
    });

    if (!!search) {
      this.search();
    }

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
    const search = this.getSearchCriteria();
    this.router.navigate(['/pokedex'], { queryParams: { search }});
  }
}
