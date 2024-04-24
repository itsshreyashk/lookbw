import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from "http";
import path from "path";
import getKeys from './keys';


const app: Application = express();

const server: http.Server = http.createServer(app);
const PORT: number = Number(process.env.PORT || 3000)

const serveFile: any = async (fileName: string) => {
    const filePath: string = path.join(__dirname, "static", fileName);
    const file: any = Bun.file(filePath);
    const contents: string = await file.text();
    return contents;
};
app.use(express.json());
app.use(cors({
    origin: "*",
}))

app.get('/', async (req: Request, res: Response) => {
    res.send(await serveFile('index.html'))
})
app.post('/api/getKeys', async (req: Request, res: Response) => {
    try {
        const body = req.body.value; // Ensure body parsing works

        if (typeof body !== 'string') {
            return res.status(400).send('Invalid request body format');
        }

        const parts = body.split('and');

        if (parts.length < 2) {
            return res.status(400).send('Request body must contain "and" to separate keys');
        }

        const firstKey: string = parts[0].trim();
        const secondKey: string = parts[1].trim();
        try {
            const result: any = await getKeys([firstKey, secondKey]);

            if (result.length === 0) {
                res.send("Ayo! Typed something wrong");
            } else {
                res.send(`${[...result]}`).status(200);
            }
        } catch (Exception: any) {
            res.send(`${Exception}`).status(500)
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Server error');
    }
});
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})