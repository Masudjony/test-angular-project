import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService, HouseService, RenterService, TokenStorageService } from './core/services';

class AuthServiceStub {
  login = jasmine.createSpy('login').and.returnValue(of({}));
}

class HouseServiceStub {
  list = jasmine.createSpy('list').and.returnValue(of({}));
}

class RenterServiceStub {
  list = jasmine.createSpy('list').and.returnValue(of({}));
}

class TokenStorageServiceStub {
  get accessToken(): string | null {
    return null;
  }

  get isAccessExpired(): boolean {
    return true;
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: HouseService, useClass: HouseServiceStub },
        { provide: RenterService, useClass: RenterServiceStub },
        { provide: TokenStorageService, useClass: TokenStorageServiceStub }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

    it(`should have the 'API POST Call Demo' title`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('API POST Call Demo');
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('API POST Call Demo');
    });
  });
