import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizacionCancelarPage } from './autorizacion-cancelar.page';

describe('AutorizacionCancelarPage', () => {
  let component: AutorizacionCancelarPage;
  let fixture: ComponentFixture<AutorizacionCancelarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionCancelarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionCancelarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
