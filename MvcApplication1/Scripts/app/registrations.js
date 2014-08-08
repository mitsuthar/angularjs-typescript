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
                $scope.name = null;
                $scope.age = null;
                $scope.salutation = null;
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
        this.description = Expense.description;
    }
    return Expense;
})();

var User = (function () {
    function User(User) {
        this.name = User.name;
        this.id = User.id;
    }
    return User;
})();

var ExpensesViewModel = (function () {
    function ExpensesViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.refresh = function () {
            logger.log("Requesting...");
            $http.get("/Home/expenses").success(function (expenses) {
                console.log(expenses);
                $scope.expenses = [];
                if (expenses.length == 0) {
                    $scope.expenses_flag = false;
                } else {
                    $scope.expenses_flag = true;
                }
                $scope.expenses = new Array();
                expenses.forEach(function (r) {
                    return $scope.expenses.push(r);
                });
            });
        };
        $scope.expenses = new Array();
        $scope.refresh();
    }
    return ExpensesViewModel;
})();
var ExpenseViewModel = (function () {
    function ExpenseViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.users = new Array();
        $http.get("/Home/users").success(function (users) {
            if (users.length == 0) {
                $scope.users_flag = false;
            } else {
                $scope.users_flag = true;
            }
            users.forEach(function (r) {
                return $scope.users.push(r);
            });
        });
        console.log($scope.users);
        $scope.save = function () {
            $http.post("/Home/expense", { amount: $scope.amount, shared_by: $scope.shared_by, date: $scope.date, description: $scope.description }, { headers: { "Content-Type": "application/json" } }).success(function (_) {
                alert("Saved Successfully");
                $scope.amount = null;
                $scope.shared_by = null;
                $scope.date = null;
                $scope.description = null;
            }).error(function (_) {
                alert("Sorry! Something went wrong!");
            });
        };
    }
    return ExpenseViewModel;
})();
//# sourceMappingURL=registrations.js.map
