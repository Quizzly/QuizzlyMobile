module.exports = {
  isRoot() {
    var currentLocation = window.location.pathname;
    return currentLocation == "/";
  },
  //quizzlyProd: "https://quizzly-backend-prod.herokuapp.com",
  quizzlyProd: "http://52.41.106.241:1337",
  localhost: "http://localhost:1337",
};
