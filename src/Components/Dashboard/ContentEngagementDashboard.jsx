import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ContentEngagementDashboard = () => {
  const chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Content Engagement Metrics'
    },
    xAxis: {
      categories: ['Blog', 'Workout Video', 'Awareness Video']
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    series: [{
      name: 'Highest Reads',
      data: [100, 80, 60]
    }, {
      name: 'Highest Likes',
      data: [50, 40, 30]
    }]
  };

  const engagementData = [
    { contentType: 'Blog', highestReads: 'Blog Title 1', highestLikes: 'Blog Title 3', averageConsumption: '5 mins' },
    { contentType: 'Workout Video', highestReads: 'Video Title 2', highestLikes: 'Video Title 1', averageConsumption: '20 mins' },
    { contentType: 'Awareness Video', highestReads: 'Video Title 4', highestLikes: 'Video Title 5', averageConsumption: '15 mins' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Content Engagement Metrics</h2>
      
      <div className="mb-8">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Content Type</th>
              <th>Highest Reads</th>
              <th>Highest Likes</th>
              <th>Average Consumption per Member</th>
            </tr>
          </thead>
          <tbody>
            {engagementData.map((item, index) => (
              <tr key={index}>
                <td>{item.contentType}</td>
                <td>{item.highestReads}</td>
                <td>{item.highestLikes}</td>
                <td>{item.averageConsumption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentEngagementDashboard;