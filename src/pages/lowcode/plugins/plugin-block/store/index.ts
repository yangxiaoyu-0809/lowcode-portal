

class BlockStore {

    store;

    constructor() {
        this.store = new Map();
    }

    init(blocks:any) {
        blocks.forEach((block:any) => {
            block.list.forEach((item:any) => {
                const { id, schema } = item;
                this.store.set(`${id}`, JSON.parse(schema));
            })
        });
    }

    set(id:any, snippets:any) {
        this.store.set(id, snippets);
    }

    get(id:any) {
        return this.store.get(id);
    }

}

const singleton = new BlockStore();

export default singleton;
