import axios from "axios";

export const getUserById = async function(id:number)  {
    try{
        const response = await axios.get(`http://13.49.21.183/api/user/${id}`);
        return response.data.username;
    }catch(error){
        throw new Error('Could not get user');
    }
}

export const getLeaderboard = async function () {
    try{
        const response = await axios.get('http://13.49.21.183/api/leaderboard');
        const leaderboardData = response.data;

        const leaderboardWithUsernames = [];
        for (const [userId, score] of Object.entries(leaderboardData)) {
            const numericUserId = Number(userId);
            const username = await getUserById(numericUserId);
            leaderboardWithUsernames.push({ username, score });
        }

        return leaderboardWithUsernames;
    }catch(error){
        throw new Error('Could not get leaderboard');
    }

}