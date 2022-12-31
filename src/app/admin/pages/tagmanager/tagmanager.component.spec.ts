import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagmanagerComponent } from './tagmanager.component';

describe('TagmanagerComponent', () => {
  let component: TagmanagerComponent;
  let fixture: ComponentFixture<TagmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagmanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
