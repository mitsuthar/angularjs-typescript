interface ILogger {
    log: (string) => void;
}

class DefaultLogger implements ILogger {
    public log(text: string) {
        console.log(text);
    }
}

interface IRegistration {
    salutation: string;
    name: string;
    age: number;
}

class Registration {
    public saluation: string;
    public name: string;
    public age: number;

    constructor(registration: IRegistration) {
        this.saluation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }
    public IsValid() {
        return this.age >= 18;
    }
}

interface IRegistrationsViewModel extends ng.IScope {
    registrations: Array<IRegistration>;
    refresh: () => void;
}

class RegistrationsViewModel {
    constructor($scope: IRegistrationsViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.registrations = new Array<IRegistration>();
        $scope.refresh = () => {
            logger.log("Requesting...");
            $http.get<Array<IRegistration>>("/api/registration")
                .success(registrations => {
                    registrations.forEach(r => $scope.registrations.push(r))
                });
        };
    }
}

interface IRegisterViewModel extends ng.IScope, IRegistration {
    save: () => void;
}

class RegisterViewModel {
    constructor($scope: IRegisterViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.save = () => {
            $http.post("/api/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } })
                .success(_ => { alert("Registered Successfully") })
                .error(_ => { alert("Sorry! Something went wrong!")});
        }
    }
}
        