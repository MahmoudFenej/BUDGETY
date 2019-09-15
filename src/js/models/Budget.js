export default class Budget {
    constructor(id, description, value, type) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.type = type;
    }
    getId() {
        return this.id;
    }
    getDescription() {
        return this.description;
    }
    getValue() {
        return this.getValue;
    }
    getType() {
        return this.type;
    }
}
