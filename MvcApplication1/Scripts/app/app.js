angular.module("RegistrationApp", ["ngRoute"]).factory("logger", function () {
    return new DefaultLogger();
}).controller("RegistrationsController", RegistrationsViewModel).controller("RegisterController", RegisterViewModel).controller("ExpensesController", ExpensesViewModel).controller("ExpenseController", ExpenseViewModel).controller("InvoiceController", InvoiceViewModel).config(function ($routeProvider) {
    $routeProvider.when("/", { templateUrl: "/templates/registrations.html", controller: "RegistrationsController" }).when("/register", { templateUrl: "/templates/register.html", controller: "RegisterController" }).when("/expenses", { templateUrl: "/templates/expenses.html", controller: "ExpensesController" }).when("/expense", { templateUrl: "/templates/expense.html", controller: "ExpenseController" }).when("/invoice", { templateUrl: "/templates/invoice.html", controller: "InvoiceController" });
});
//# sourceMappingURL=app.js.map
