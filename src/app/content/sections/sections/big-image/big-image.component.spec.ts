import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigImageComponent } from './link-image-big-text.component';

describe('BigImageComponent', () => {
  let component: BigImageComponent;
  let fixture: ComponentFixture<BigImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
