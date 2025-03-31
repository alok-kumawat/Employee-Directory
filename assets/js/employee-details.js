// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = parseInt(urlParams.get('id'));
    
    if (employeeId) {
        loadEmployeeDetails(employeeId);
    } else {
        showError('Employee not found');
    }
});

// Load employee details
function loadEmployeeDetails(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (employee) {
        renderEmployeeDetails(employee);
        loadEmployeePerformance(employeeId);
    } else {
        showError('Employee not found');
    }
}

// Render employee details
function renderEmployeeDetails(employee) {
    document.getElementById('employeeName').textContent = employee.name;
    document.getElementById('employeeAvatar').textContent = employee.name.charAt(0);
    document.getElementById('employeeTitle').textContent = employee.title;
    document.getElementById('employeeDepartment').textContent = employee.department;
    document.getElementById('employeeEmail').textContent = employee.email;
    document.getElementById('employeePhone').textContent = employee.phone;
    document.getElementById('employeeHireDate').textContent = formatDate(employee.hireDate);
    document.getElementById('employeeId').textContent = employee.employeeId;

    // Render skills
    const skillsList = document.getElementById('skillsList');
    if (skillsList && employee.skills) {
        skillsList.innerHTML = employee.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
    }

    // Render projects
    const projectsList = document.getElementById('projectsList');
    if (projectsList && employee.projects) {
        projectsList.innerHTML = employee.projects.map(project => 
            `<li class="project-item">${project}</li>`
        ).join('');
    }
}

// Load employee performance data
function loadEmployeePerformance(employeeId) {
    // Get dummy performance data from performance-data.js for the employee
    const performance = employeePerformance[employeeId];
    
    if (performance) {
        // Render the performance chart
        renderPerformanceChart(performance.ratings);
        
        // Render the reviews
        renderReviews(performance.reviews);
    } else {
        console.log('No performance data found for employee');
    }
}

// Render performance chart
function renderPerformanceChart(ratings) {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ratings.map((_, index) => `Q${4 - index}`),
            datasets: [{
                label: 'Performance Rating',
                data: ratings.reverse(),
                borderColor: '#2563eb',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

// Render performance reviews
function renderReviews(reviews) {
    const reviewsList = document.getElementById('recentReviews');
    if (!reviewsList) return;

    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-period">${review.period}</span>
                <span class="review-rating">${review.rating.toFixed(1)}</span>
            </div>
            <p class="review-comments">${review.comments}</p>
        </div>
    `).join('');
}

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show error message if employee not found
function showError(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="error-state">
                <img src="assets/images/error-icon.svg" alt="Error" class="error-icon">
                <p>${message}</p>
            </div>
        `;
    }
}