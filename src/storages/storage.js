var ls = global.localStorage;

class Storage {
    constructor (key) {
        this.key = key;
    }
    set(data) {
        ls.setItem(this.key, JSON.stringify(data));
    }
    get(data) {
        return JSON.parse(ls.getItem(this.key) || '[]');
    }
}

export default Storage;