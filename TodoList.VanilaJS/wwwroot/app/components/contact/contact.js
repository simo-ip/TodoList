import Page from "../../page.js";

let Contact = {
    render: async () => {
        
        let page = new Page('./app/components/contact/contact.html');
        await page.load();

        return page.html; //view;
    },
    after_render: async () => {
        console.log('contact');
    }
};

export default Contact;