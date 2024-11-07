class VotingApp {
    constructor(ctx, data) {
        this.ctx = ctx;
        this.votes = {};

        // Options from JSON
        this.options = data.map(item => item.option);  
        this.colors = data.map(item => item.color);    

        // Pre requisite methods
        this.initializeForm();
        this.updateChart();
    }

    initializeForm() {
        document.getElementById('voteForm').addEventListener('submit', (event) => {
            this.handleVote(event);
        });
        
        const voteOption = document.getElementById('voteOption');
        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            voteOption.appendChild(optionElement);
        });
    }

    handleVote(event) {
        event.preventDefault();
        const voteInput = document.getElementById('voteOption');
        const selectedOption = voteInput.value;
        
        if (selectedOption) {
            this.votes[selectedOption] = (this.votes[selectedOption] || 0) + 1;
            this.updateChart();
            this.showToast(); 
            voteInput.value = ''; 
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('voteModal'));
            modal.hide();
        }
    }

    showToast() {
        const toastEl = document.getElementById('voteToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    updateChart() {
        const labels = this.options;
        const data = labels.map(option => this.votes[option] || 0);

        if (this.chart) {
            this.chart.destroy(); 
        }

        this.chart = new Chart(this.ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Votes',
                    data: data,
                    backgroundColor: this.colors,  
                }]
            },
            options: {
                responsive: true,
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    fetch('voting.json')
        .then(response => response.json())
        .then(data => {
            const app = new VotingApp(ctx, data);  // Pass the entire data array to VotingApp
        })
        .catch(error => {
            console.error('Error fetching options:', error);
        });
});