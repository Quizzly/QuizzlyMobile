module.exports = {
  isRoot() {
    var currentLocation = window.location.pathname;
    return currentLocation == "/";
  },
  quizzlyProd: "https://quizzly-backend-prod.herokuapp.com",
  localhost: "http://localhost:1337",
};
