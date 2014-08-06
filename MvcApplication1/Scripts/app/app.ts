angular.module("RegistrationApp", ["ngRoute"])
    .factory("logger", () => new DefaultLogger())
    .controller("RegistrationsController", RegistrationsViewModel)
    .controller("RegisterController", RegisterViewModel)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when("/", { templateUrl: "/templates/registrations.html", controller: "RegistrationsController" })
            .when("/register", { templateUrl: "/templates/register.html", controller: "RegisterController" })
    }
        
    )