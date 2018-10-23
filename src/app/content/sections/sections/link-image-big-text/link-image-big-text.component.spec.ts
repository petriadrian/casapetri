import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkImageBigTextComponent } from './link-image-big-text.component';

describe('LinkImageBigTextComponent', () => {
  let component: LinkImageBigTextComponent;
  let fixture: ComponentFixture<LinkImageBigTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkImageBigTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkImageBigTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
