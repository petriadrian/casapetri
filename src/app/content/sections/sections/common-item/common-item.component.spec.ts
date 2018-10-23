import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonItemComponent } from './common-item.component';

describe('CommonArticleComponent', () => {
  let component: CommonItemComponent;
  let fixture: ComponentFixture<CommonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
