export default class BudgetManager {
    constructor() {
        this.budgetAllItems = {
            inc: [],
            exp: []
        }
    }
    addBudgetElement(type, elementValue) {
        this.budgetAllItems[type].push(elementValue);
    }
    getAllBudgetValues(type) {
        return this.budgetAllItems[type];
    }
    getBudgetSum(type) {
        return this.getAllBudgetValues(type).reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    getPercentage() {
        const totalIncome = this.getBudgetSum("inc");
        const totalExpense = this.getBudgetSum("exp");
        return Math.round((totalExpense / totalIncome) * 100);
    }
    getTotalBudget() {
        const allIncomes = this.getBudgetSum("inc");
        const allExpenses = this.getBudgetSum("exp");
        return allIncomes - allExpenses;
    }

}