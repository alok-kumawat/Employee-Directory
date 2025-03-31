// Here I added  dummy Employee performance data
const employeePerformance = {
    1: {  // Alok Kumawat data
        ratings: [4.5, 4.4, 4.3, 4.0],
        reviews: [
            {
                period: '2025 Q1',
                rating: 4.5,
                comments: 'Excellent work on the frontend development.'
            },
            {
                period: '2024 Q4',
                rating: 4.0,
                comments: 'Consistently delivers high quality code.'
            }
        ]
    },
    2: {  // Abhishek Chauhan data
        ratings: [4.2, 4.0, 4.5, 4.0],
        reviews: [
            {
                period: '2025 Q1',
                rating: 4.2,
                comments: 'Strong leadership in marketing.'
            },
            {
                period: '2024 Q4',
                rating: 4.0,
                comments: 'Successfully managed multiple projects.'
            }
        ]
    },
    3: {  // Adarsh Gupta data
        ratings: [4.8, 4.5, 4.2, 4.5],
        reviews: [
            {
                period: '2025 Q1',
                rating: 4.8,
                comments: 'Outstanding sales performance in this month.'
            },
            {
                period: '2024 Q4',
                rating: 4.5,
                comments: 'Exceeds sales targets consistently.'
            }
        ]
    },
    4: {  // Ajeet Saini data
        ratings: [4.3, 4.1, 3.4, 4.1],
        reviews: [
            {
                period: '2025 Q1',
                rating: 4.3,
                comments: 'Good implementation of new HR policies.'
            },
            {
                period: '2024 Q4',
                rating: 4.1,
                comments: 'Good work on employee engagement activities.'
            },
            {
                period: '2024 Q3',
                rating: 3.4,
                comments: 'Effective implementation of new HR policies.'
            }
        ]
    },
    5: {  // Chaman Swami data
        ratings: [4.7, 4.6, 4.4, 4.6],
        reviews: [
            {
                period: '2025 Q1',
                rating: 4.7,
                comments: 'Outstanding technical leadership and mentoring.'
            },
            {
                period: '2024 Q4',
                rating: 4.6,
                comments: 'Successfully implemented system architecture.'
            }
        ]
    }
};

// It is dummy performance reviews data used at alert in performance reviews page
const performanceReviews = [
    {
        id: 1, // unique id of review
        employeeId: 1, // unique id of employee Alok Kumawat
        period: '2025-Q1',
        rating: 4.5,
        status: 'Completed',
        comments: 'Excellent work on the frontend development.'
    },
    {
        id: 2,
        employeeId: 2, // unique id of employee Abhishek Chauhan
        period: '2025-Q1',
        rating: 4.2,
        status: 'Completed',
        comments: 'Strong leadership in marketing.'
    },
    {
        id: 3,
        employeeId: 3, // unique id of employee Adarsh Gupta
        period: '2025-Q1',
        rating: 4.8,
        status: 'Completed',
        comments: 'Outstanding sales performance in this month.'
    },
    {
        id: 4,
        employeeId: 4, // unique id of employee Ajeet Saini
        period: '2024-Q3',
        rating: 3.4,
        status: 'Completed',
        comments: 'Effective implementation of new HR policies.'
    },
    {
        id: 5,
        employeeId: 5, // unique id of employee Chaman Swami
        period: '2024-Q4',
        rating: 4.6,
        status: 'Completed',
        comments: 'Successfully implemented system architecture.'
    }
];