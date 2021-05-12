require('colors');
require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busqueda.js');


const main = async() => {
    const busquedas = new Busquedas();
    let opcion = '';
    do {

        opcion = await inquirerMenu();

        switch (opcion) {
        case 1:
            // mostrar el mensaje
            const termino = await leerInput('Ciudad: ');
            // buscar los lugar
            const lugares = await busquedas.ciudad(termino);

            // seleccionar el lugar
            const id = await listarLugares(lugares);
            if (id === '0') continue;
            const ciudad = lugares.find(lugar => lugar.id === id);

            // guardar en la db
            busquedas.agregarHistorial(ciudad.nombre);

            // datos del clima
            const clima = await busquedas.climaLugar(ciudad.lat, ciudad.lng);

            // mostrar los resultados
            console.clear();
            console.log('\nInformación de la ciudad\n'.green);
            console.log('Ciudad: ', ciudad.nombre);
            console.log('Lat:', ciudad.lat);
            console.log('Lng:', ciudad.lng);
            console.log('Temperatura:', clima.temp);
            console.log('Min:', clima.min);
            console.log('Max:', clima.max);
            console.log('Descripcion:', clima.desc);
            break;
        case 2:
            busquedas.historialCapitalizado.forEach((lugar, index) => {
                const i = `${index+=1}`.green;
                console.log(`${i} ${lugar}`);
            });
            break;
        case '0':
            console.log('salio...');
            break;
        }

        await pausa();
    } while (opcion !== 0);

}

main();