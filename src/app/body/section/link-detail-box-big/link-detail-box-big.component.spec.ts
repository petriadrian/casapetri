import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailBoxBigComponent } from './link-detail-box-big.component';

describe('LinkDetailBoxBigComponent', () => {
  let component: LinkDetailBoxBigComponent;
  let fixture: ComponentFixture<LinkDetailBoxBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkDetailBoxBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailBoxBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
