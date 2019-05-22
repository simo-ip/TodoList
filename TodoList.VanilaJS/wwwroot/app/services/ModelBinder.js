let ModelBinder = {
    create: (state) => {
        return new Proxy(state, {
            set(target, property, value) {
                target[property] = value;
                ModelBinder.render(state);
                return true;
            }
        });
    },
    /*
    render: (state) => {
        const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
            e => e.dataset.binding
        );
        bindings.forEach((binding) => {
            document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
            let el = document.querySelector(`[data-model='${binding}']`);
            if (el) el.value = state[binding];
        });
    },
    */

    
    render: (state) => {
        if (!state) return;
        const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
            e => e.dataset.binding
        );
        bindings.forEach((binding) => {
            if (document.querySelector(`[data-binding='${binding}']`))
                document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
            if (document.querySelector(`[data-model='${binding}']`))
                document.querySelector(`[data-model='${binding}']`).value = state[binding];
        });
    },
    
    applayBindings: (state) => {
        const listeners = document.querySelectorAll('[data-model]');

        listeners.forEach((listener) => {
            const name = listener.dataset.model;
            listener.addEventListener('keyup', (event) => {
                state[name] = listener.value;
                console.log(state);
            });
        });
    }
};

export default ModelBinder;