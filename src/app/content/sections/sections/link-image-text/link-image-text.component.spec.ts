import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkImageTextComponent } from './link-image-text.component';

describe('LinkDetailBoxComponent', () => {
  let component: LinkImageTextComponent;
  let fixture: ComponentFixture<LinkImageTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkImageTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
