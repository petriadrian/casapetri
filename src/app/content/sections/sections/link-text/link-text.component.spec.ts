import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTextComponent } from './link-text.component';

describe('LinkComponent', () => {
  let component: LinkTextComponent;
  let fixture: ComponentFixture<LinkTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
