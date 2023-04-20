
const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';
    const dataPath2 = './data/info.json';
    const dataPath3 = './data/cities.json';
    const dataPath4 = './data/getCompanyHoppers.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

   app.get('/api/company/info', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        fs.readFile(dataPath2, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

   app.get('/api/workspaces/cities', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        fs.readFile(dataPath3, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

   app.get('/api/company/getCompanyHoppers', (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        fs.readFile(dataPath4, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
            // Note: this isn't ideal for production use. 
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // delete the user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;
