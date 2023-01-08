import axios from 'axios';

const baseUrl = process.env.NBA_DATA_URL;

export async function getAdvancedTeamData() {
  try {
    const teamData = await axios.get(`${baseUrl}/nbaTeamEfficiency.json`);
    return teamData.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
