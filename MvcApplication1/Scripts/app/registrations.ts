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
                    $scope.name = null;
                    $scope.age = null;
                    $scope.salutation = null;
                })
                .error(_ => { alert("Sorry! Something went wrong!")});
        }

    }
}

interface IExpense {
    amount: number;
    shared_by: Array<string>;
    description: string;
    date: any;
}

interface IUser {
    name: string;
    id: number;
}

class Expense {
    public amount: number;
    public shared_by: Array<string>;
    public date: any;
    public description: string;
    constructor(Expense: IExpense) {
        this.amount = Expense.amount;
        this.shared_by = Expense.shared_by;
        this.date = Expense.date;
        this.description = Expense.description;
    }
}

class User {
    public name: string;
    public id: number;
    constructor(User: IUser) {
        this.name = User.name;
        this.id = User.id;
    }
}
interface IExpenseViewModel extends ng.IScope, IExpense {
    save: () => void;
    users: Array<IUser>;
    users_flag: any;
}
interface IExpensesViewModel extends ng.IScope {
    expenses: Array<IExpense>;
    expenses_flag: any;
    refresh: () => void;
   
}

class ExpensesViewModel {
    constructor($scope: IExpensesViewModel, $http: ng.IHttpService, private logger: ILogger) {
        
        $scope.refresh = () => {
            logger.log("Requesting...");
            $http.get<Array<IExpense>>("/Home/expenses")
                .success(expenses => {
                    console.log(expenses);
                    $scope.expenses = [];
                    if (expenses.length == 0) {
                        $scope.expenses_flag = false;
                    }
                    else {
                        $scope.expenses_flag = true;
                    }
                    $scope.expenses = new Array<IExpense>();
                    expenses.forEach(r => $scope.expenses.push(r));
                });
        };
        $scope.expenses = new Array<IExpense>();
        $scope.refresh();
        
    }
}
class ExpenseViewModel {
    constructor($scope: IExpenseViewModel, $http: ng.IHttpService, private logger: ILogger) {
        $scope.users = new Array<IUser>();
        $http.get<Array<IUser>>("/Home/users")
            .success(users => {
                if (users.length == 0) {
                    $scope.users_flag = false;
                }
                else {
                    $scope.users_flag = true;
                }
                users.forEach(r => $scope.users.push(r));
            });
        console.log($scope.users);
        $scope.save = () => {

            $http.post("/Home/expense", { amount: $scope.amount, shared_by: $scope.shared_by, date: $scope.date, description: $scope.description }, { headers: { "Content-Type": "application/json" } })
                .success(_ => {
                    alert("Saved Successfully");
                    $scope.amount = null;
                    $scope.shared_by = null;
                    $scope.date = null;
                    $scope.description = null;
                })
                .error(_ => { alert("Sorry! Something went wrong!") });
        }

    }
  
}