const fs = require('fs');

const archivo = 'db/archivo.json';


const guardarDB = (data) => {
    const payload = {
        historial: data
    }
    fs.writeFileSync(archivo, JSON.stringify(payload));
};


const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return [];
    }

    let info = fs.readFileSync(archivo, { encoding: 'utf-8' });

    info = JSON.parse(info);
    return info['historial'];
};


module.exports = {
    guardarDB,
    leerDB
};