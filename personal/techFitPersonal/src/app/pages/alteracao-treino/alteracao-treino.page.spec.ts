import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlteracaoTreinoPage } from './alteracao-treino.page';

describe('AlteracaoTreinoPage', () => {
  let component: AlteracaoTreinoPage;
  let fixture: ComponentFixture<AlteracaoTreinoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteracaoTreinoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlteracaoTreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
