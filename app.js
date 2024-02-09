const { argv } = require('process');
const yargs = require('yargs');
const contacts = require('./contact');

yargs.command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demanOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'No HP',
            demanOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanContac(argv.nama, argv.email, argv.noHP);
    },
}).demandCommand();

// menampilkan daftar semua nama kontak
yargs.command({
    command: 'list',
    describe: 'Menambahkan Semua Nama dan No HP',
    handler() {
        contacts.listContact();
    },
});

// Menampilkan detail dari sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string',
        }, 
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});


// menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string',
        }, 
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();
