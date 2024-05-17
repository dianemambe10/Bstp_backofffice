import { TestBed } from '@angular/core/testing';

import { HttpCoreInterceptorInterceptor } from './http-core-interceptor.interceptor';

describe('HttpCoreInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCoreInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCoreInterceptorInterceptor = TestBed.inject(HttpCoreInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
