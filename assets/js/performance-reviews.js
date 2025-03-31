// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    populateMetrics();
    renderCharts();
    renderReviewsTable();
    populateEmployeeSelect();
});

// Setup event listeners
function setupEventListeners() {
    // Search and filter listeners
    document.getElementById('employeeSearch').addEventListener('input', filterReviews);
    document.getElementById('periodFilter').addEventListener('change', filterReviews);
    document.getElementById('performanceFilter').addEventListener('change', filterReviews);

    // Modal listeners
    document.getElementById('addReviewBtn').addEventListener('click', () => {
        document.getElementById('reviewModal').style.display = 'block';
    });

    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmit);
}

// Populate key metrics
function populateMetrics() {
    const avgRating = calculateAverageRating();
    const totalReviews = performanceReviews.length;
    const needsImprovement = performanceReviews.filter(review => review.rating < 3).length;

    document.getElementById('avgRating').textContent = avgRating.toFixed(1);
    document.getElementById('totalReviews').textContent = totalReviews;
    document.getElementById('improvementNeeded').textContent = needsImprovement;
}

// Calculate average rating
function calculateAverageRating() {
    if (performanceReviews.length === 0) return 0;
    const sum = performanceReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / performanceReviews.length;
}

// Render all charts
function renderCharts() {
    renderTrendsChart();
    renderDepartmentChart();
    renderDistributionChart();
}

// Render performance trends chart
function renderTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;

    const periods = ['2024-Q3', '2024-Q4', '2025-Q1'];
    const avgRatings = periods.map(period => {
        const periodReviews = performanceReviews.filter(review => review.period === period);
        if (periodReviews.length === 0) return 0;
        return periodReviews.reduce((acc, review) => acc + review.rating, 0) / periodReviews.length;
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: periods,
            datasets: [{
                label: 'Average Rating',
                data: avgRatings,
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

// Render department performance chart
function renderDepartmentChart() {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;

    const departments = [...new Set(employees.map(emp => emp.department))];
    const departmentRatings = departments.map(dept => {
        const deptEmployees = employees.filter(emp => emp.department === dept);
        const deptReviews = deptEmployees.flatMap(emp => 
            performanceReviews.filter(review => review.employeeId === emp.id)
        );
        if (deptReviews.length === 0) return 0;
        return deptReviews.reduce((acc, review) => acc + review.rating, 0) / deptReviews.length;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: departments,
            datasets: [{
                label: 'Average Rating',
                data: departmentRatings,
                backgroundColor: '#2563eb'
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

// Render rating distribution chart
function renderDistributionChart() {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;

    const ratings = [1, 2, 3, 4, 5];
    const distribution = ratings.map(rating => {
        return performanceReviews.filter(review => 
            Math.floor(review.rating) === rating
        ).length;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
            datasets: [{
                label: 'Number of Reviews',
                data: distribution,
                backgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Render reviews table
function renderReviewsTable(reviewsToShow = performanceReviews) {
    const tableBody = document.getElementById('reviewTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    reviewsToShow.forEach(review => {
        const employee = employees.find(emp => emp.id === review.employeeId);
        if (!employee) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${review.period}</td>
            <td>${review.rating.toFixed(1)}</td>
            <td><span class="status-badge ${review.status.toLowerCase()}">${review.status}</span></td>
            <td>
                <button class="action-button" onclick="viewReview(${review.id})">View</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter reviews based on search and filters
function filterReviews() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const periodFilter = document.getElementById('periodFilter').value;
    const ratingFilter = document.getElementById('performanceFilter').value;

    const filteredReviews = performanceReviews.filter(review => {
        const employee = employees.find(emp => emp.id === review.employeeId);
        if (!employee) return false;

        const matchesSearch = employee.name.toLowerCase().includes(searchTerm);
        const matchesPeriod = !periodFilter || review.period === periodFilter;
        const matchesRating = !ratingFilter || Math.floor(review.rating) === parseInt(ratingFilter);

        return matchesSearch && matchesPeriod && matchesRating;
    });

    renderReviewsTable(filteredReviews);
}

// Populate employee select in the modal
function populateEmployeeSelect() {
    const select = document.getElementById('reviewEmployee');
    if (!select) return;

    select.innerHTML = '<option value="">Select Employee</option>' +
        employees.map(emp => 
            `<option value="${emp.id}">${emp.name} - ${emp.department}</option>`
        ).join('');
}

// Handle new review submission
function handleReviewSubmit(event) {
    event.preventDefault();

    const formData = {
        employeeId: parseInt(document.getElementById('reviewEmployee').value),
        period: document.getElementById('reviewPeriod').value,
        rating: parseFloat(document.getElementById('reviewRating').value),
        comments: document.getElementById('reviewComments').value,
        status: 'Completed'
    };

    // Add new review
    const newReview = {
        id: performanceReviews.length + 1,
        ...formData
    };
    performanceReviews.push(newReview);

    // Update dashboard
    populateMetrics();
    renderCharts();
    renderReviewsTable();

    // Close modal and reset form
    closeModal();
    event.target.reset();
}

// View review details
function viewReview(reviewId) {
    const review = performanceReviews.find(r => r.id === reviewId);
    if (!review) return;

    const employee = employees.find(emp => emp.id === review.employeeId);
    if (!employee) return;

    alert(`
Review Details
Employee: ${employee.name}
Period: ${review.period}
Rating: ${review.rating}
Comments: ${review.comments}
    `);
}

// Close modal
function closeModal() {
    document.getElementById('reviewModal').style.display = 'none';
}