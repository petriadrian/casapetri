import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWebSiteComponent } from './footer-web-site.component';

describe('FooterWebSiteComponent', () => {
  let component: FooterWebSiteComponent;
  let fixture: ComponentFixture<FooterWebSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterWebSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterWebSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
