import Budget from "./Budget.js";
export default class Income extends Budget {
    constructor(id, description, value) {
        super(id, description, value, "exp")
        this.budgetAllItems =  [];
    }
}