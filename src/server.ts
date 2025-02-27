import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import { router } from "./routes";
import cors from 'cors';
import path from "path";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits:{ fileSize: 50 * 1024 * 1024 } //No máximo 50mb
}))
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Interal server error."
    })
})

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`))