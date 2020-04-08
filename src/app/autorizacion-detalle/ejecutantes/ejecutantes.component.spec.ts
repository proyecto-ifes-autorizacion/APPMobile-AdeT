import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EjecutantesComponent } from './ejecutantes.component';

describe('EjecutantesComponent', () => {
  let component: EjecutantesComponent;
  let fixture: ComponentFixture<EjecutantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecutantesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EjecutantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
