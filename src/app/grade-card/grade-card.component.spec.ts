import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradeCardComponent } from './grade-card.component';

describe('GradeCardComponent', () => {
    let component: GradeCardComponent;
    let fixture: ComponentFixture<GradeCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GradeCardComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(GradeCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
