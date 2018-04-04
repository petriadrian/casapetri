import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWebSiteComponent } from './header-web-site.component';

describe('HeaderWebSiteComponent', () => {
  let component: HeaderWebSiteComponent;
  let fixture: ComponentFixture<HeaderWebSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWebSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWebSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
