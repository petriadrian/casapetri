import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailBoxComponent } from './link-detail-box.component';

describe('LinkDetailBoxComponent', () => {
  let component: LinkDetailBoxComponent;
  let fixture: ComponentFixture<LinkDetailBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkDetailBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
