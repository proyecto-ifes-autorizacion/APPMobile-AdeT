import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab1DetallesPage } from './tab1-detalles.page';

describe('Tab1DetallesPage', () => {
  let component: Tab1DetallesPage;
  let fixture: ComponentFixture<Tab1DetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab1DetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1DetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
