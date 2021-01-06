describe('Search engine', () => {
  it('test criterions return', () => {
    cy.request('GET', '/api/cities/criterions')
    .then((response) => {
      expect(response.body).to.have.property('data')
    });
  });
});
