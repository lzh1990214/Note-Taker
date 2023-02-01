// create a new router object
const apiRoutes = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
// generate 18 byte unique id based on the time, process id and mac address
var uniqid = require('uniqid');

// GET request: read the 'db.json' file and return the saved notes
apiRoutes.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.json(`${req.method} request received to get notes`);
    // Log request to the terminal
    console.info(`${req.method} request received to get notes`);
    // Send all notes to the client
    return res.json(notes);
});

// POST request: receive a new notes object with 'title' and 'text' in the 'req.body', 
// then append the new notes object to the 'db.json' file, and return the new notes object to the client 
apiRoutes.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add notes`);
    // Destructuring assignment for the items (title and text) in the 'req.body'
    const { title, text } = req.body;
    // Check if both title and text are in the 'req.body'
    if (title && text) {
        // create a newNotes object with the title and text in the request body, 
        // and assign a random id with uniqid() dependency
        const newNotes = {
            title: title,
            text: text,
            id: uniqid(),
        };
        // create a response object to show status and data
        const response = {
            status: 'success',
            data: newNotes,
        };
        console.log(response);
        res.status(201).json(response);
        // res.json(`Notes for ${newNotes.title} have been logged!`);

        // import existing notes in English(utf8) format
        fs.readFile('../db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                let parsedNotes = JSON.parse(data);
                // Push a newNotes object into the parsedNotes array
                parsedNotes.push(newNotes);
                // Write updated notes back to the file
                fs.writeFile(
                    '../db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated your notes!')
                )
            };
        });
    } else {
        res.status(500).json('Error in saving your notes, please make sure title and text area are not empty.');
    }
});

// DELETE request: should receive a parameter including the id of the selected notes.
apiRoutes.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete notes`);
    // import existing notes in English(utf8) format
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert string data into JSON object
            let originNotes = JSON.parse(data);
            let filterNotes = originNotes.filter(item => item.id !== req.params.id);
            // Write updated notes back to the file
            fs.writeFile(
                '../db/db.json',
                JSON.stringify(filterNotes, null, 4),
                (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully deleted your notes!')
            );
            res.json(filterNotes);
        };
    });
})

module.exports = apiRoutes;



