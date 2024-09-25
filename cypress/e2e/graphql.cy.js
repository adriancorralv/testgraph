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
        console.log(response.body.data.MediaTrend);
  
        expect(response.body.data.MediaTrend.mediaId).eq(109100);
      });
    });

  