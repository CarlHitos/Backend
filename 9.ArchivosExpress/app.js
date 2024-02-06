const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
fs = require('fs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }))
app.use(express.static('public'));
app.use('/fotos', express.static('archivos'));

app.get('/descarga', (req, res) => {
    const file = req.query.file
    res.download('./archivos/' + file)
})


app.post('/subir', async (req, res) => {
    let date = new Date()
    let now = date.toISOString()
    now = now.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')

    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded',
        })
    } else {
        let file = req.files.file
        let md5 = file.md5
        file.mv('./archivos/' + now + md5 + file.name)

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: now + md5 + file.name,
                mimetype: file.mimetype,
                size: file.size,
            }
        })
    }
})

app.get('/imagenes', (req, res) => {
    fs.readdir('./archivos/', (err, files) => {
        if (err) {
            res.send('Error leyendo los archivos.', err);
        } else {
            const imgNames = files;
            res.send(imgNames);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
