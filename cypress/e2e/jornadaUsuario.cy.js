describe('Jornadas de usuário', () => {
  const novaTransacao = {
    tipoTransacao: 'Depósito',
    valor: '100'
  }; 

  it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
    cy.fixture('dadosUsuario').as('usuario');
    cy.get('@usuario').then((usuario) => {
      cy.login(usuario.email, usuario.senha);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(usuario.nome).should('be.visible');

      cy.getByData('titulo-boas-vindas').should( 'contain', 'Bem vindo de volta!' );

      cy.contains('Selecione um tipo de transação').should('be.visible');
      cy.getByData('select-opcoes').select(novaTransacao.tipoTransacao);
      cy.getByData('select-opcoes').should('have.value', novaTransacao.tipoTransacao);

      cy.getByData('form-input').type(novaTransacao.valor);
      cy.getByData('form-input').should('have.value', novaTransacao.valor);

      cy.getByData('realiza-transacao').click();
      cy.getByData('lista-transacoes').find('li').last().contains(novaTransacao.valor);

      cy.window().then((win) => {
        expect(win.localStorage.getItem('nomeUsuario')).to.equal(usuario.nome);

        const userId = win.localStorage.getItem('userId');

        cy.request({
          method:'GET', 
          url: `http://localhost:8000/users/${userId}/transations`,
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.length.at.least(1);
          expect(resposta.body[resposta.body.length - 1]).to.deep.include(novaTransacao);
        })

        cy.getByData('botao-sair').click();

        cy.url().should('include', '/');

        cy.getByData('titulo-principal').contains(
          'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!'
        );
      })
    });

    
    // cy.visit('/');

    // cy.getByData('botao-login').click();
    // cy.getByData('email-input').type('neilton@alura.com');
    // cy.getByData('senha-input').type('123456');
    // cy.getByData('botao-enviar').click();

    // cy.location('pathname').should('eq', '/home');

    // cy.getByData('select-opcoes').select('Transferência');
    // cy.getByData('form-input').type('80');
    // cy.getByData('realiza-transacao').click();

    // cy.getByData('lista-transacoes').find('li').last().contains('- R$ 80');

    // cy.getByData('botao-sair').click();
    // cy.location('pathname').should('eq', '/');
  });
});
