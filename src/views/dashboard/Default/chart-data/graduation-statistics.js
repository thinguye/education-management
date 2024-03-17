// ===========================|| DASHBOARD - TOTAL ORDER YEAR CHART ||=========================== //
const chartData = {
    type: 'pie',
    height: 90,
    options: {
        dataLabels: {
            enabled: true
        },
        
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Graduation Statistics'
            },
            marker: {
                show: false
            }
        }
    },
};

export default chartData;
