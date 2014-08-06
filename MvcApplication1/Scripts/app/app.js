angular.module("RegistrationApp", ["ngRoute"]).factory("logger", function () {
    return new DefaultLogger();
}).controller("RegistrationsController", RegistrationsViewModel).controller("RegisterController", RegisterViewModel).config(function ($routeProvider) {
    $routeProvider.when("/", { templateUrl: "/templates/registrations.html", controller: "RegistrationsController" }).when("/register", { templateUrl: "/templates/register.html", controller: "RegisterController" });
});
//# sourceMappingURL=app.js.map
