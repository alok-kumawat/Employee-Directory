// Firstly Initialize the page so that the page is ready to use
document.addEventListener('DOMContentLoaded', () => {
    renderEmployeeTable(employees);
    setupEventListeners();
});

// Setup event listeners to handle user interactions
function setupEventListeners() {
    const jobTitleFilter = document.getElementById('jobTitleFilter');
    const sortDepartmentBtn = document.getElementById('sortDepartment');

    if (jobTitleFilter) {
        jobTitleFilter.addEventListener('input', filterEmployees);
    }

    if (sortDepartmentBtn) {
        sortDepartmentBtn.addEventListener('click', sortByDepartment);
    }
}

// Filter employees by job title
function filterEmployees() {
    const jobTitleFilter = document.getElementById('jobTitleFilter')?.value.toLowerCase();
    const filtered = employees.filter(employee => {
        const matchesJobTitle = !jobTitleFilter || 
            employee.title.toLowerCase().includes(jobTitleFilter);
        return matchesJobTitle;
    });

    if (filtered.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        document.querySelector('.table-responsive').style.display = 'none';
    } else {
        document.getElementById('emptyState').style.display = 'none';
        document.querySelector('.table-responsive').style.display = 'block';
    }

    renderEmployeeTable(filtered);
}

// Sort employees by department
function sortByDepartment() {
    const sorted = [...employees].sort((a, b) => 
        a.department.localeCompare(b.department)
    );
    renderEmployeeTable(sorted);
}

// Render the employee table to display employees
function renderEmployeeTable(employeesToRender) {
    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    employeesToRender.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="employee-name">
                    <div class="avatar">${employee.name.charAt(0)}</div>
                    ${employee.name}
                </div>
            </td>
            <td>${employee.department}</td>
            <td>${employee.title}</td>
            <td>${formatDate(employee.hireDate)}</td>
            <td>
                <button class="action-button" onclick="viewEmployee(${employee.id})">
                    View Details
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Format date to a more readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// View employee details
function viewEmployee(id) {
    window.location.href = `employee-details.html?id=${id}`;
}