import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizacionListaPage } from './autorizacion-lista.page';

describe('AutorizacionListaPage', () => {
  let component: AutorizacionListaPage;
  let fixture: ComponentFixture<AutorizacionListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
