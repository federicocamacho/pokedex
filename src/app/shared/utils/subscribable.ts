import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class Subscribable implements OnDestroy {

  /**
   * {@link Subject} that emits a value and completes when the component is going to be destroyed.
   *
   */
  public destroyed = new Subject();

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
