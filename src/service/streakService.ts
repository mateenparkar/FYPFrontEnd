import axios, { AxiosError } from 'axios';

interface UpdateStreak {
    userId: number;
    lastActivityDate: string;  
}

export const updateStreak = async function(update: UpdateStreak): Promise<void> {
    try {
        // Use template literals to include userId and lastActivityDate in the URL
        const lastActivityDateFormatted = new Date(update.lastActivityDate).toISOString().split('T')[0];

        await axios.post(`http://localhost:8080/api/updateStreak/${update.userId}/${lastActivityDateFormatted}`, update);
    } catch (e) {
        if ((e as AxiosError).response?.status === 400) {
            throw new Error('Failed to update streak');
        }
    }
}

export const getStreak = async function(userId: number){
    try{
        const response = await axios.get(`http://localhost:8080/api/getStreak/${userId}`);
        return response.data;
    }catch(e){
        if ((e as AxiosError).response?.status === 400) {
            throw new Error('Failed to update streak');
        }
    }
}
