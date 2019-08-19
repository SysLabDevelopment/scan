import { TestBed, inject } from '@angular/core/testing';
import { RootGuard } from './root.guard';
describe('RootGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RootGuard]
        });
    });
    it('should ...', inject([RootGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=root.guard.spec.js.map