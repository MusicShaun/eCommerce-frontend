module.exports = {
  projectId: "cqtanu",

  // ...rest of the Cypress project config
  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
};
