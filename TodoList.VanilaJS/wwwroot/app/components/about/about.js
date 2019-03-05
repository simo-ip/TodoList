import Page from "../../page.js";

let About = {
    render: async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> About </h1>
            </section>
        `;

        let page = new Page('./app/components/about/about.html');
        await page.load();

        return page.html; //view;
    },
    after_render: async () => {
        console.log('about');
    }

};

export default About;