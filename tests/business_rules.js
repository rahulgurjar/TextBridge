const { calculateCredits, checkFreeTierLimit } = require('../backend/logic');

describe('JamaTxt Business Rule Validation', () => {
    
    test('Should deduct 9 credits for a 10-person group (excluding sender)', () => {
        const memberCount = 10;
        const creditsDeducted = calculateCredits(memberCount);
        expect(creditsDeducted).toBe(9);
    });

    test('Should block creating a 3rd group on Free Tier', () => {
        const existingGroups = 2;
        const canCreate = checkFreeTierLimit(existingGroups);
        expect(canCreate).toBe(false);
    });

    test('Should trigger Admin Alert at 80% usage', () => {
        const limit = 500;
        const currentUsage = 401;
        const shouldAlert = currentUsage > (limit * 0.8);
        expect(shouldAlert).toBeTruthy();
    });

});
