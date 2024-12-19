import type { Request, Response } from 'express';
import { generateQuestions } from '../service/GroqService';

export class GroqController {
    public static generateQuestions = async function(req: Request, res: Response): Promise<void> {
        try {
            const { bookName } = req.body; 
            const questions = await generateQuestions(bookName); 
            res.status(200).json(questions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to generate questions.' });
        }
    }
}
