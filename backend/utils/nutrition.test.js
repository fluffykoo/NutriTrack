const { getDailyTotals } = require('./nutrition');

describe('getDailyTotals', () => {
  it('calcule les totaux correctement', () => {
    const repas = [
      { calories: 500, proteines: 30, glucides: 50, lipides: 20 },
      { calories: 400, proteines: 20, glucides: 40, lipides: 10 }
    ];

    const resultat = getDailyTotals(repas);

    expect(resultat).toEqual({
      calories: 900,
      proteines: 50,
      glucides: 90,
      lipides: 30
    });
  });
});