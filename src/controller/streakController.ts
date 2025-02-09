import type { Request, Response } from 'express';
import { getStreak, updateStreak } from '../service/streakService';

export class StreakController {
    public static async get(req: Request, res: Response): Promise<void> {
        await updateStreak;
        const streak = await getStreak(req.session.user!.userId);
        const userId = req.session.user!.userId;



        if (streak && streak.lastActivityDate) {
            const formattedDate = new Date(streak.lastActivityDate).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            streak.lastActivityDate = formattedDate;
        }

        res.render('streak', { user: req.session.user, userId: userId, streak: streak });
    }

    public static updateStreak = async function (req: Request, res: Response): Promise<void> {
        try {
            const data = {
                userId: req.session.user!.userId,
                lastActivityDate: req.body.lastActivityDate
            };
            await updateStreak(data);
            res.redirect('/account');
        } catch (e) {
            console.error(e);
            res.locals.errormessage = (e as Error).message;
            res.redirect('/account');
        }
    }
}
