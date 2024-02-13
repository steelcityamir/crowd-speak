// Using ES6 import syntax for Axios
import axios from 'axios';

// Function to extract the base URL from the script's src attribute
const getBaseApiUrl = () => {
    const currentScriptSrc = document.currentScript.src;
    const url = new URL(currentScriptSrc);
    return `${url.protocol}//${url.host}`;
}

// Base API URL
const BASE_API_URL = getBaseApiUrl();

window.addEventListener('DOMContentLoaded', (event) => {
    // On page load, fetch and populate scores
    fetchAndPopulateScores();

    // Attach event listeners to upvote and downvote buttons
    document.querySelectorAll('.crowdspeak-upvote').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.parentNode.getAttribute('data-id');
            vote(postId, 'upvote');
        });
    });

    document.querySelectorAll('.crowdspeak-downvote').forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.parentNode.getAttribute('data-id');
            vote(postId, 'downvote');
        });
    });
});

const fetchAndPopulateScores = () => {
    axios.get(`${BASE_API_URL}/scores`)
        .then(response => {
            const scores = response.data.data;
            scores.forEach(score => {
                const scoreSpan = document.querySelector(`div[data-id="${score.id}"] .crowdspeak-score`);
                if (scoreSpan) {
                    scoreSpan.textContent = score.score;
                }
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}

const vote = (postId, action) => {
    axios.post(`${BASE_API_URL}/scores/${postId}/${action}`)
        .then(response => {
            // After voting, update the score for the specific post
            refreshScore(postId);
        })
        .catch(error => console.error('Error posting vote:', error));
}

const refreshScore = (postId) => {
    axios.get(`${BASE_API_URL}/scores/${postId}`)
        .then(response => {
            const score = response.data.data.score;
            const scoreSpan = document.querySelector(`div[data-id="${postId}"] .crowdspeak-score`);
            if (scoreSpan) {
                scoreSpan.textContent = score;
            }
        })
        .catch(error => console.error('Error updating score:', error));
}
