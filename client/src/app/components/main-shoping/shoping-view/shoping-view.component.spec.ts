import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingViewComponent } from './shoping-view.component';

describe('ShopingViewComponent', () => {
  let component: ShopingViewComponent;
  let fixture: ComponentFixture<ShopingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
