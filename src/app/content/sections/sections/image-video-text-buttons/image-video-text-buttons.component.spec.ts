import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageVideoTextButtonsComponent } from './image-video-text-buttons.component';

describe('HeadlineComponent', () => {
  let component: ImageVideoTextButtonsComponent;
  let fixture: ComponentFixture<ImageVideoTextButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageVideoTextButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageVideoTextButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
