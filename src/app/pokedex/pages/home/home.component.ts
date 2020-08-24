import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      super();
    }

  ngOnInit(): void {
    const search = this.route.snapshot.queryParams.search;
    this.searchForm = this.formBuilder.group({
      search: [search || '']
    });

    if (!!search) {
      this.search();
    }

    this.searchForm.get('search').valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntil(this.destroyed)
      )
      .subscribe(searchCriteria => this.search());
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
    console.log('searching', search);
    this.router.navigate(['/pokedex'], { queryParams: { search }});
  }

  public goToProfile(): void {
    this.router.navigate(['/pokedex', 'perfil']);
  }
}
