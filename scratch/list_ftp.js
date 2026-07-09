const ftp = require("basic-ftp")
async function list() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "serwer2617918.home.pl",
            user: "antygravity@serwer2617918.home.pl",
            password: "Kurwa123$$$",
            secure: false
        })
        const list = await client.list()
        console.log(list.map(f => `${f.type === 2 ? 'd' : '-'} ${f.name}`).join('\n'))
    }
    catch(err) {
        console.error("FTP error:", err)
    }
    client.close()
}
list()
