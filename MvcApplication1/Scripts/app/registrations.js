var DefaultLogger = (function () {
    function DefaultLogger() {
    }
    DefaultLogger.prototype.log = function (text) {
        console.log(text);
    };
    return DefaultLogger;
})();

var Registration = (function () {
    function Registration(registration) {
        this.saluation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }
    Registration.prototype.IsValid = function () {
        return this.age >= 18;
    };
    return Registration;
})();

var RegistrationsViewModel = (function () {
    function RegistrationsViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.registrations = new Array();
        $scope.refresh = function () {
            logger.log("Requesting...");
            $http.get("/Home/registrations").success(function (registrations) {
                $scope.registrations = [];
                if (registrations.length == 0) {
                    $scope.registrations_flag = false;
                } else {
                    $scope.registrations_flag = true;
                }
                registrations.forEach(function (r) {
                    return $scope.registrations.push(r);
                });
            });
        };
        $scope.refresh();
    }
    return RegistrationsViewModel;
})();

var RegisterViewModel = (function () {
    function RegisterViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.save = function () {
            $http.post("/Home/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } }).success(function (_) {
                alert("Registered Successfully");
                $scope.name = "";
                $scope.age = null;
                $scope.salutation = "";
            }).error(function (_) {
                alert("Sorry! Something went wrong!");
            });
        };
    }
    return RegisterViewModel;
})();

var Expense = (function () {
    function Expense(Expense) {
        this.amount = Expense.amount;
        this.shared_by = Expense.shared_by;
        this.date = Expense.date;
    }
    return Expense;
})();

var ExpensesViewModel = (function () {
    function ExpensesViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.expenses = new Array();
        $scope.refresh = function () {
            logger.log("Requesting...");
            $http.get("/Home/expenses").success(function (expenses) {
                $scope.expenses = [];
                if (expenses.length == 0) {
                    $scope.expenses_flag = false;
                } else {
                    $scope.expenses_flag = true;
                }
                expenses.forEach(function (r) {
                    return $scope.expenses.push(r);
                });
            });
        };
        $scope.refresh();
    }
    return ExpensesViewModel;
})();
var ExpenseViewModel = (function () {
    function ExpenseViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.save = function () {
            $http.post("/Home/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } }).success(function (_) {
                alert("Registered Successfully");
                $scope.name = "";
                $scope.age = null;
                $scope.salutation = "";
            }).error(function (_) {
                alert("Sorry! Something went wrong!");
            });
        };
    }
    return ExpenseViewModel;
})();
//# sourceMappingURL=registrations.js.map
