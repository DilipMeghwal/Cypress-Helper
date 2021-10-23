const fs = require('fs-extra')
const path  = require('path')

fs.removeSync('cypress/reports', { recursive: true }, () => console.log('done'))

fs.mkdirs(path.join(__dirname, 'reports'), (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('reports directory created')
})

fs.mkdirs(path.join(__dirname, 'reports/mochareports'), (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('reports/mochareports directory created')
})