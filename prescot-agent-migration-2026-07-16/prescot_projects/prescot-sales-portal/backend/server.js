const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const PORTAL_DATA_PATH = path.join(__dirname, '../src/data/sales_data_parsed.json');
const ANALYZER_SCRIPT = '/Users/karolbohdanowicz/my-ai-agents/.agent/skills/prescot-bi-analyzer/scripts/analyzer.py';
const PYTHON_PATH = 'python3';

// 1. Get current data
app.get('/api/data', (req, res) => {
    if (fs.existsSync(PORTAL_DATA_PATH)) {
        const data = fs.readFileSync(PORTAL_DATA_PATH, 'utf8');
        res.json(JSON.parse(data));
    } else {
        res.status(404).json({ error: 'Sales data not found. Please run analysis.' });
    }
});

// 2. Trigger analysis
app.post('/api/analyze', (req, res) => {
    const { filePaths } = req.body;
    if (!filePaths || !Array.isArray(filePaths)) {
        return res.status(400).json({ error: 'Please provide an array of file paths.' });
    }

    const pathsStr = filePaths.map(p => `"${p}"`).join(' ');
    const cmd = `${PYTHON_PATH} "${ANALYZER_SCRIPT}" --json-output "${PORTAL_DATA_PATH}" ${pathsStr}`;

    console.log(`Running: ${cmd}`);

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: error.message, details: stderr });
        }
        res.json({ message: 'Analysis completed successfully', output: stdout });
    });
});

app.listen(PORT, () => {
    console.log(`Prescot BI Backend running at http://localhost:${PORT}`);
});
