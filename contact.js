const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Membuat Folder Data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file json jika tidak ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// Membaca data contact dari file json
const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

// Simpan Contact ke dalam File JSON
const simpanContac = (nama, email, noHP) => {
    const contact = { nama, email, noHP};
    const contacts = loadContact();

    // Cek Duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contac Sudah Terdaftar, Gunakan nama lain !!!'));
        return false;
    }

    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email Tidak valid !!!'));
            return false;
        }
    }

    // cek no hp
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('No Hp Tidak Valid !!!!'));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold(`Terima kasih ${nama}`));

};

// Untuk menampilkan Contact di Terminal
const listContact = () => {
    const contacts = loadContact();

    console.log(chalk.cyan.inverse.bold('Daftar Contacts : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};


// Menampilkan detail contact
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    // Melakukan pengecekan nama jika ada atau jika tidak ada
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan !!!`));
        return false;
    }

    // jika daftar tersebut ada 
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    // Jika Email ada di dalam daftar JSON
    if(contact.email) {
        console.log(contact.email);
    };
};

// Menghapus Contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    // jika nama tidak ada 
    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan !!!`));
        return false;
    }

    fs.writeFileSync('data/contact.json', JSON.stringify(newContacts));

    console.log(chalk.green.inverse.bold(`data contact ${nama} telah berhasil dihapus !!!`));
};

module.exports = {simpanContac, listContact, detailContact, deleteContact};