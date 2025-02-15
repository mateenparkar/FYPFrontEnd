import axios, { AxiosError } from 'axios';

interface UpdateStreak {
    userId: number;
    lastActivityDate: string;  
}

export const updateStreak = async function(update: UpdateStreak): Promise<void> {
    try {
        const lastActivityDateFormatted = new Date(update.lastActivityDate).toISOString().split('T')[0];
        console.log(lastActivityDateFormatted)

        await axios.post(`http://fyp.mateenparkar.xyz/api/updateStreak/${update.userId}/${lastActivityDateFormatted}`, update);
    } catch (e) {
        if ((e as AxiosError).response?.status === 400) {
            throw new Error('Failed to update streak');
        }
    }
}

export const getStreak = async function(userId: number){
    try{
        const response = await axios.get(`http://fyp.mateenparkar.xyz/api/getStreak/${userId}`);
        return response.data;
    }catch(e){
        if ((e as AxiosError).response?.status === 400) {
            throw new Error('Failed to update streak');
        }
    }
}
