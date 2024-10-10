class ChartCreator {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.chartData = null;
    }

    async init() {
        await this.fetchData();
        if (this.chartData) {
            this.createCharts();
        }
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            this.chartData = await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    createCharts() {
        // This method will be overridden in subclasses
        throw new Error('createCharts() must be implemented in subclasses');
    }
}

class LineChart extends ChartCreator {
    constructor(dataUrl) {
        super(dataUrl);
        this.areaCtx = document.getElementById('areaChart');
    }

    createCharts() {
        this.createAreaChart();
    }

    createAreaChart() {
        new Chart(this.areaCtx, {
            type: 'line',
            data: {
                labels: this.chartData.labels,
                datasets: [{
                    label: '# of Votes',
                    data: this.chartData.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

class BarChart extends ChartCreator {
    constructor(dataUrl) {
        super(dataUrl);
        this.barCtx = document.getElementById('barChart');
    }

    createCharts() {
        this.createBarChart();
    }

    createBarChart() {
        new Chart(this.barCtx, {
            type: 'bar',
            data: {
                labels: this.chartData.labels,
                datasets: [{
                    label: '# of Votes',
                    data: this.chartData.data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

const lineChartCreator = new LineChart('data.json');
lineChartCreator.init();

const barChartCreator = new BarChart('data.json');
barChartCreator.init();

console.log(lineChartCreator.dataUrl);
console.log(barChartCreator.dataUrl);