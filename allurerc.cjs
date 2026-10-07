module.exports = {
  name: 'Allure Report',
  output: './allure-report',

  plugins: {
    awesome: {
      options: {
        reportName: 'Allure Report',

        charts: [
          {
            type: 'currentStatus',
            title: 'Current status',
          },
          {
            type: 'testResultSeverities',
            title: 'Test results by severities',
          },
          {
            type: 'durations',
            title: 'Durations histogram',
            groupBy: 'none',
          },
        ],
      },
    },
  },
};