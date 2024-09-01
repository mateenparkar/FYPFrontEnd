import type { Request, Response } from "express";
import { getLeaderboard } from "../service/leaderboardService";


export class LeaderboardController {
    public static async get(req: Request, res: Response): Promise<void> {
        const leaderboard = await getLeaderboard();
        console.log(leaderboard);
        res.render('leaderboard', {leaderboards:leaderboard, user: req.session.user});
    }
}