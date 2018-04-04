import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonArticleComponent } from './common-article.component';

describe('CommonArticleComponent', () => {
  let component: CommonArticleComponent;
  let fixture: ComponentFixture<CommonArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
