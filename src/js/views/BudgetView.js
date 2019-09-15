import { elements } from './Base.js';
import Expense from '../models/Expense.js';
import Income from '../models/Income.js';
import BudgetManager from '../models/BudgetManager.js';

export default class BudgetView {
    constructor() {
        this.type = elements.budgetTypeCmbBox.value;
        this.budgetManager = new BudgetManager();
    }
    addListItem = (obj) => {

        var html = '<div class="item clearfix" id="' + this.type + '-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        html = html.replace('%id%', obj.id);
        html = html.replace('%description%', obj.description);
        html = html.replace('%value%', obj.value);

        if (this.type === "inc")
            elements.budgetIncomeList.insertAdjacentHTML('beforeend', html);
        else
            elements.budgetExpenseList.insertAdjacentHTML('beforeend', html);

    };
    updateTotalIncomeExpense() {
        const budgetSum = this.budgetManager.getBudgetSum(this.type);
        if (this.type === "exp")
            elements.budgetExpenseValue.textContent = budgetSum;
        else
            elements.budgetIncomeValue.textContent = budgetSum;

    }
    updateMonth() {
        const currentDate = new Date();
        const fullYear = currentDate.getFullYear();
        elements.budgetTitleMonth.textContent = currentDate.getMonth() + " " + fullYear;
    }
    clearFields() {
        elements.budgetValueTxtField.textContent = "";
        elements.budgetDescriptionTxtField.textContent = "";
        elements.budgetIncomeValue.textContent = 0;
        elements.budgetExpenseValue.textContent = 0;
        elements.budgetValue.textContent = 0;
        elements.budgetExpensePercentage.textContent = 0 + "%";
    }
    initListeners(){
        elements.budgetAddBtn.addEventListener("click", this.addBudgetAction);
        elements.container.addEventListener("click", this.deleteBudgetAction);
    }
    addBudgetAction = () => {
        this.type = elements.budgetTypeCmbBox.value;
        const desc = elements.budgetDescriptionTxtField.value;
        const value = elements.budgetValueTxtField.value;

        var id;

        const allBudgetValues = this.budgetManager.getAllBudgetValues(this.type);
        if (allBudgetValues.length > 0) {
            id = allBudgetValues[allBudgetValues.length - 1].id + 1;
        } else {
            id = 0;
        }
        var budget;

        if (this.type === "exp")
            budget = new Expense(id, desc, value, this.type);
        else
            budget = new Income(id, desc, value, this.type);

        this.addListItem(budget);

        this.budgetManager.addBudgetElement(this.type, value);

        this.updateTotalIncomeExpense(this.type);

        elements.budgetValue.textContent = this.budgetManager.getTotalBudget();

        const percentage = this.budgetManager.getPercentage();
        const percToDisplay = isNaN(percentage) ? 0 : this.budgetManager.getPercentage();
        elements.budgetExpensePercentage.textContent = percToDisplay + "%";

    }
    deleteBudgetAction = (event) => {
        const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            //inc-1
            var splitID = itemID.split('-');
            var type = splitID[0];
            var ID = parseInt(splitID[1]);

            budgetManager.getAllBudgetValues(type).splice(ID, 1);


            var el = document.getElementById(itemID);
            el.parentNode.removeChild(el);

            budgetManager.updateTotalIncomeExpense(type);

            elements.budgetValue.textContent = budgetManager.getTotalBudget();

            elements.budgetExpensePercentage.textContent = budgetManager.getPercentage() + "%";
        }
    }
}