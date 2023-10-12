class Player {
    constructor(name, isAi) {
        this.name = name;
        this.isAi = isAi || false;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export {Player};