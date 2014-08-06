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
            $http.get("/api/registration").success(function (registrations) {
                registrations.forEach(function (r) {
                    return $scope.registrations.push(r);
                });
            });
        };
    }
    return RegistrationsViewModel;
})();

var RegisterViewModel = (function () {
    function RegisterViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.save = function () {
            $http.post("/api/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } }).success(function (_) {
                alert("Registered Successfully");
            }).error(function (_) {
                alert("Sorry! Something went wrong!");
            });
        };
    }
    return RegisterViewModel;
})();
//# sourceMappingURL=registrations.js.map
