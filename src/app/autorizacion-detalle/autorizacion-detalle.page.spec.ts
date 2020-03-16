import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizacionDetallePage } from './autorizacion-detalle.page';

describe('AutorizacionDetallePage', () => {
  let component: AutorizacionDetallePage;
  let fixture: ComponentFixture<AutorizacionDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
