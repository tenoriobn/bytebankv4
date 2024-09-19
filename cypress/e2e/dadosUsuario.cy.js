describe('Teste de dados do usuário', () => {
  it('Deve verificar se as informações do usuário aparecem na interface do usuário', () => {
    cy.fixture('dadosUsuario').then(usuario => {
      cy.login(usuario.email, usuario.senha);
      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario.nome).should('be.visible');

      cy.getByData('lista-transacoes').find('li').should('have.length', usuario.transacoes.length);


      usuario.transacoes.forEach((transacao, index) => {
        cy.getByData('lista-transacoes')
          .find('li')
          .eq(index)
          .find('[data-test="valorTransacao"]')
          .invoke('text')
          .then((text) => {
            const valorNumerico = text.replace(/[^\d]/g, '');
            expect(valorNumerico).to.eq(`${transacao.valor}`);
          });
      });
      
      cy.getByData('saldo').should('include.text', `R$ ${usuario.saldo}`)

    })
  });
  
});
