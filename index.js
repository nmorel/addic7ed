const fs = require('fs')
const path = require('path')

function start() {
    const showsPage = fs.readFileSync(path.join(__dirname, 'shows.html'))
    const regex = /<a href="\/show\/([0-9]*)">(.*?)<\/a>/ig

    const file = fs.createWriteStream(path.join(__dirname, 'Addic7ed.json'));
    file.write('[')
    let first = true

    try {
        let match
        while (match = regex.exec(showsPage)) {
            if (!first) {
                file.write(',')
            }
            file.write(JSON.stringify({ name: match[2], url: match[1] }))
            first = false
        }
    } catch (e) {
        console.error(e)
    }
    file.write(']')
    file.end()
}

start()
