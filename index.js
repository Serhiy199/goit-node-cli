import { program } from 'commander';
import contacts from './contacts.js';
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const arrContacts = await contacts.listContacts();
            console.table(arrContacts);
            break;

        case 'get':
            const getContactById = await contacts.getContactById(id);
            console.table(getContactById);
            break;

        case 'add':
            const addContact = await contacts.addContact(name, email, phone);
            console.table(addContact);
            break;

        case 'remove':
            const removeContact = await contacts.removeContact(id);
            console.table(removeContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(options);
