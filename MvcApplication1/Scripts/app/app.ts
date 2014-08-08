angular.module("RegistrationApp", ["ngRoute"])
    .factory("logger", () => new DefaultLogger())
    .controller("RegistrationsController", RegistrationsViewModel)
    .controller("RegisterController", RegisterViewModel)
    .controller("ExpensesController", ExpensesViewModel)
    .controller("ExpenseController", ExpenseViewModel)
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when("/", { templateUrl: "/templates/registrations.html", controller: "RegistrationsController" })
            .when("/register", { templateUrl: "/templates/register.html", controller: "RegisterController" })
            .when("/expenses", { templateUrl: "/templates/expenses.html", controller: "ExpensesController" })
            .when("/expense", { templateUrl: "/templates/expense.html", controller: "ExpenseController" })
    }
        
    )