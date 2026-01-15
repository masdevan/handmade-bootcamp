module.exports = {
    projectId: "sf4doz",
    e2e: {
      baseUrl: 'http://localhost:3000',
      supportFile: false,
      specPattern: 'cypress/e2e/**/*.cy.js',
    },
    env: {
      BASE_URL: 'http://localhost:3000',
    },
  }
  