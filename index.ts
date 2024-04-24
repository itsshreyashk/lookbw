import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from "http";
import path from "path";



const app: Application = express();

const server: http.Server = http.createServer(app);
const PORT: number = Number(process.env.PORT || 3000)

const serveFile: any = async (fileName : string) => {
    const filePath : string = path.join(__dirname, "static", fileName);
    const file : any = Bun.file(filePath);
    const contents : string = await file.text();
    return contents;
};
app.use(express.json());
app.use(cors({
    origin: "*",
}))

app.get('/', async (req: Request, res: Response) => {
    res.send(await serveFile('index.html'))
})


server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})