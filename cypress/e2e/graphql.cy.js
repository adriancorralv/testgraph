// import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils'


// context('TestGraphQL',()=>{
//   // beforeEach(() => {

//   //   // cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
//   //   //   // Queries
//   //   //   aliasQuery(req, 'GetLaunchList')
//   //   //   aliasQuery(req, 'LaunchDetails')
//   //   //   aliasQuery(req, 'GetMyTrips')

//   //   //   // Mutations
//   //   //   aliasMutation(req, 'Login')
//   //   //   aliasMutation(req, 'BookTrips')
//   //   // })
//   // })

// it.only('test graphql',()=>{
//   const header={
//     'content-type':'application/json',
//     'Accept-Encoding':'gzip, deflate, br',
//   };
//   const queryBody={
//     query : `query ($releasing: Boolean, $mediaId: Int) {
//   MediaTrend(releasing: $releasing, mediaId: $mediaId) {
//     mediaId
//     date
//     trending
//     averageScore
//     popularity
//     inProgress
//     episode
//     media {
//       id
//       title {
//         romaji
//         english
//         native
//         userPreferred
//       }
//     }
//   }
// }`
// ,
//   };
//   const values={
//     variables: {"releasing":  false, "mediaId":  109090}

//   };


//   cy.request({
//     method:'POST',
//     headers: header,
//     url:'https://anilist.co/graphiql',
//     body: JSON.parse(JSON.stringify(query))
//   })

// })

//   // beforeEach(() => {
//   //   cy.intercept('POST', 'https://anilist.co/graphiql', (req) => {
//   //     // Queries

//   //     aliasQuery(req, 'MediaTrend')


//   //     // ...
//   //   })
//   // })
//   // it.only('should verify login data', () => {
//   //   cy.wait('@gqlMediaTrendQuery')
//   //     .its('response.body.data.MediaTrend')
//   //     .should('have.property', 'mediaID')
//   //     .and('have.property', 'popularity')
//   //     .and('popularity','contains',0)
//   // })

//   // it('should verify login data', () => {
//   //   cy.wait('@gqlLoginQuery')
//   //     .its('response.body.data.login')
//   //     .should('have.property', 'id')
//   //     .and('have.property', 'token')
//   // })


//   // ...
// })


// // describe('template spec', () => {

// //   it.only('Prueba GraphQL',()=>{
// //     cy.request('POST',)
// //   })


// //   it('passes', () => {
// //     cy.visit('https://example.cypress.io')
// //   })
// // })

// cypress/integration/graphql_spec.js

describe('GraphQL Test', () => {
    it.skip('intercept data',()=>{
      cy.intercept('POST','http://localhost:5118/api/Auth/Login',{
        fixture:'intercept.json'
      }).as('dataLoginFix');
      cy.visit('http://localhost:4200');
      cy.get('[data-test-id="emailLogin"]').type('adrian.corral@cedhsonora.org.mx');
      cy.get('[data-test-id="passwordLogin"]').type('Adrian1808');
      cy.get('[data-test-id="btnLogin"]').click();
   
     
  
    })
    it('should fetch media trend data', () => {
      // Intercepta la solicitud GraphQL
      // cy.intercept('POST', 'https://graphql.anilist.co', (req) => {
      //   // Verifica que la solicitud tenga el query correcto
      //   if (req.body.query.includes('MediaTrend')) {
      //     req.reply((res) => {
      //       // Puedes modificar la respuesta aquí si es necesario
      //       res.send({
      //         data: {
      //           MediaTrend: [
      //             {
      //               mediaId: 109090,
      //               date: '2024-09-19',
      //               trending: 100,
      //               averageScore: 85,
      //               popularity: 5000,
      //               inProgress: true,
      //               episode: 12,
      //               media: {
      //                 id: 109090,
      //                 title: {
      //                   romaji: 'Ejemplo Romaji',
      //                   english: 'Example English',
      //                   native: '例の日本語',
      //                   userPreferred: 'Preferred Title'
      //                 }
      //               }
      //             }
      //           ]
      //         }
      //       });
      //     });
      //   }
      // }).as('getMediaTrend');
  
      // Realiza la solicitud GraphQL
      cy.request({
        method: 'POST',
        url: 'https://graphql.anilist.co',
        body: {
          query: `
            query ($releasing: Boolean, $mediaId: Int) {
              MediaTrend(releasing: $releasing, mediaId: $mediaId) {
                mediaId
                date
                trending
                averageScore
                popularity
                inProgress
                episode
                media {
                  id
                  title {
                    romaji
                    english
                    native
                    userPreferred
                  }
                }
              }
            }
          `,
          variables: {
            releasing: false,
            mediaId: 109100
          }
        }
      }).then((response) => {
        // Verifica la respuesta
        //cy.log(response);
        console.log(response.body.data.MediaTrend.mediaId);
  
        expect(response.body.data.MediaTrend.mediaId).eq(109100);
      });
    });
  });
  