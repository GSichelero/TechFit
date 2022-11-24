import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjusteExerciciosModalComponent } from './ajuste-exercicios-modal.component';

describe('AjusteExerciciosModalComponent', () => {
  let component: AjusteExerciciosModalComponent;
  let fixture: ComponentFixture<AjusteExerciciosModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AjusteExerciciosModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjusteExerciciosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
