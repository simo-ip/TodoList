import Page from "../../page.js";

let Home = {
    render: async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> Home Page </h1>
            </section>
        `;

        let page = new Page('./app/components/home/home.html');
        await page.load();

        return page.html; //view;
    },
    after_render: async () => {
        console.log('home page');
    }

};

export default Home;