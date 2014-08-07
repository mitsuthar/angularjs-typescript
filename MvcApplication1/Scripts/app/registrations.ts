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
    registrations_flag: any;
    refresh: () => void;
}

class RegistrationsViewModel {
    constructor($scope: IRegistrationsViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.registrations = new Array<IRegistration>();
        $scope.refresh = () => {
            logger.log("Requesting...");
            $http.get<Array<IRegistration>>("/Home/registrations")
                .success(registrations => {
                    $scope.registrations = [];
                    if (registrations.length == 0) {
                        $scope.registrations_flag = false;
                    }
                    else
                    {
                        $scope.registrations_flag = true;
                    }
                    registrations.forEach(r => $scope.registrations.push(r))
                });
        };
        $scope.refresh();
    }
}

interface IRegisterViewModel extends ng.IScope, IRegistration {
    save: () => void;
}

class RegisterViewModel {
    constructor($scope: IRegisterViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.save = () => {
            $http.post("/Home/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } })
                .success(_ => {
                    alert("Registered Successfully");
                    $scope.name = "";
                    $scope.age = null;
                    $scope.salutation = "";
                })
                .error(_ => { alert("Sorry! Something went wrong!")});
        }

    }
}

interface IExpense {
    amount: number;
    shared_by: Array<string>;
    date: any;
}

class Expense {
    public amount: number;
    public shared_by: Array<string>;
    public date: any;
    constructor(Expense: IExpense) {
        this.amount = Expense.amount;
        this.shared_by = Expense.shared_by;
        this.date = Expense.date;
    }
}
interface IExpenseViewModel extends ng.IScope, IExpense {
    save: () => void;
}
interface IExpensesViewModel extends ng.IScope {
    expenses: Array<IExpense>;
    expenses_flag: any;
    refresh: () => void;
}

class ExpensesViewModel {
    constructor($scope: IExpensesViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.expenses = new Array<IExpense>();
        $scope.refresh = () => {
            logger.log("Requesting...");
            $http.get<Array<IExpense>>("/Home/expenses")
                .success(expenses => {
                    $scope.expenses = [];
                    if (expenses.length == 0) {
                        $scope.expenses_flag = false;
                    }
                    else {
                        $scope.expenses_flag = true;
                    }
                    expenses.forEach(r => $scope.expenses.push(r));
                });
        };
        $scope.refresh();
    }
}
class ExpenseViewModel {
    constructor($scope: IExpensesViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.save = () => {
            $http.post("/Home/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } })
                .success(_ => {
                    alert("Registered Successfully");
                    $scope.name = "";
                    $scope.age = null;
                    $scope.salutation = "";
                })
                .error(_ => { alert("Sorry! Something went wrong!") });
        }

    }
  
}