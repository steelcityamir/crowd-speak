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
    document.querySelectorAll('.crowdspeak-upvote, .crowdspeak-downvote').forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.parentNode.getAttribute('data-id');
            const action = this.classList.contains('crowdspeak-upvote') ? 'upvote' : 'downvote';
            vote(postId, action, this);
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

const vote = (postId, action, clickedButton) => {
    // Construct a unique key for localStorage based on postId and action
    const voteKey = `vote_${postId}`;

    // Check if the user has already voted for this action on the post
    if (localStorage.getItem(voteKey)) {
        console.log('You have already voted on this post.');
        return;
    }

    axios.post(`${BASE_API_URL}/scores/${postId}/${action}`)
        .then(response => {
            // After voting, update the score for the specific post
            refreshScore(postId);

            // Mark this vote in localStorage to prevent future votes on the same post and action
            localStorage.setItem(voteKey, 'true');
            
            // Disable both vote buttons for the post
            const parentDiv = clickedButton.parentNode;
            const upvoteButton = parentDiv.querySelector('.crowdspeak-upvote');
            const downvoteButton = parentDiv.querySelector('.crowdspeak-downvote');
            upvoteButton.disabled = true;
            downvoteButton.disabled = true;
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
