import BudgetView from './views/BudgetView.js';

const budgetView = new BudgetView();

var init = (() =>{
   
    console.log('Application has started.');

    budgetView.updateMonth();
    budgetView.clearFields();
    budgetView.initListeners();

    
})();
