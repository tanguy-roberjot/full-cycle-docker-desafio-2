const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

// Verifica se a tabela 'people' existe, senão a cria
connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`, (err, result) => {
    if (err) throw err;
    console.log(result)
});

app.get('/', (req,res) => {
    const name = req.query.name || 'Tanguy';
    const insertSql = `INSERT INTO people(name) VALUES('${name}')`;

    connection.query(insertSql, (err, result) => {
        if (err) throw err;

        const selectSql = 'SELECT * FROM people';

        connection.query(selectSql, (err, rows) => {
            if (err) throw err;

            let peopleList = '';
            for (let i = 0; i < rows.length; i++) {
                peopleList += `<li>${rows[i].name}</li>`;
            }

            const responseHtml = `
                <h1>Full Cycle Rocks</h1>
                <ul>${peopleList}</ul>
            `;

            res.send(responseHtml);
        });

    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})