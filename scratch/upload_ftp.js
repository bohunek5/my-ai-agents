const ftp = require("basic-ftp")

async function upload() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "serwer2617918.home.pl",
            user: "antygravity@serwer2617918.home.pl",
            password: "Kurwa123$$$",
            secure: false
        })
        console.log("Connected to FTP");
        await client.uploadFromDir("/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir")
        console.log("Upload completed.")
    }
    catch(err) {
        console.error("FTP error:", err)
    }
    client.close()
}

upload()
