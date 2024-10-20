<template>
    <div class="random-team-generator">
      <h1>Random Team Picker</h1>
      <p class="subtitle">A random team generator that helps to form randomized teams.</p>
  
      <div class="generator-container">
        <div class="input-section">
          <h2>1. Enter the participants</h2>
          <textarea v-model="participants" placeholder="Enter names, one per line"></textarea>
          <p class="participant-count">{{ participantCount }} participants</p>
        </div>
  
        <div class="options-section">
          <h2>2. How to split:</h2>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="teams" v-model="splitBy">
              <span class="radio-label">Number of teams</span>
            </label>
            <label class="radio">
              <input type="radio" value="participants" v-model="splitBy">
              <span class="radio-label">Participants per team</span>
            </label>
          </div>
          <div class="select-wrapper">
            <select v-model="splitValue">
              <option v-for="n in 10" :key="n" :value="n">{{ n }} {{ splitBy }}</option>
            </select>
          </div>
  
          <h2>3. Title of tournament</h2>
          <input type="text" v-model="title" placeholder="Enter a title" class="title-input">
  
          <div class="button-group">
            <button @click="clearAll" class="clear-button">Clear</button>
            <button @click="generateTeams" class="generate-button">Generate teams</button>
          </div>
        </div>
      </div>
      <div v-if="teams.length" class="results">
      <h2>{{ title || 'Generated Teams' }}</h2>
      <div class="teams-container">
        <table v-for="(team, index) in teams" :key="index" class="team-table">
          <thead>
            <tr>
              <th>Team {{ index + 1 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in team" :key="member">
              <td>{{ member }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        participants: '',
        splitBy: 'teams',
        splitValue: 2,
        title: '',
        teams: []
      }
    },
    computed: {
      participantCount() {
        return this.participants.split('\n').filter(name => name.trim()).length;
      }
    },
    methods: {
    generateTeams() {
      const names = this.participants.split('\n').filter(name => name.trim());
      const shuffled = this.shuffleArray([...names]);
      
      this.teams = [];
      if (this.splitBy === 'teams') {
        const teamsCount = this.splitValue;
        for (let i = 0; i < teamsCount; i++) {
          this.teams.push([]);
        }
        shuffled.forEach((name, index) => {
          this.teams[index % teamsCount].push(name);
        });
      } else {
        const membersPerTeam = this.splitValue;
        for (let i = 0; i < shuffled.length; i += membersPerTeam) {
          this.teams.push(shuffled.slice(i, i + membersPerTeam));
        }
      }
    },
    clearAll() {
      this.participants = '';
      this.splitBy = 'teams';
      this.splitValue = 2;
      this.title = '';
      this.teams = [];
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
  }
  </script>

  <style scoped>
  .random-team-generator {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 5px;
  }
  
  .subtitle {
    color: #666;
    margin-top: 0;
  }
  
  .generator-container {
    display: flex;
    gap: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 30px;
    margin-top: 20px;
  }
  
  .input-section, .options-section {
    flex: 1;
  }
  
  h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    resize: vertical;
  }
  
  .participant-count {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .radio-group {
    margin-bottom: 15px;
  }
  
  .radio {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .radio input {
    margin-right: 10px;
  }
  
  .radio-label {
    font-size: 16px;
    color: #333;
  }
  
  .select-wrapper {
    position: relative;
    margin-bottom: 20px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    appearance: none;
    background-color: white;
    font-size: 16px;
  }
  
  .select-wrapper::after {
    content: '▼';
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  .title-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .clear-button {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .generate-button {
    background-color: #e91e63;
    color: white;
  }
  
  .clear-button:hover {
    background-color: #e0e0e0;
  }
  
  .generate-button:hover {
    background-color: #d81b60;
  }

  .results {
  margin-top: 30px;
}

.teams-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.team-table {
  flex: 1;
  min-width: 200px;
  border-collapse: collapse;
  background-color: #f9f9f9;
  border-radius: 4px;
  overflow: hidden;
}

.team-table th {
  background-color: #e91e63;
  color: white;
  padding: 10px;
  text-align: left;
}

.team-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
}

.team-table tr:last-child td {
  border-bottom: none;
}
  </style>