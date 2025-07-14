
let employees = [];
let filteredEmployees = [];
let currentPage = 1;
let itemsPerPage = 10;
let sortBy = '';
let sortOrder = 'asc';


async function loadEmployees() {
    try {
        const response = await fetch('./data/employees.json');
        employees = await response.json();
        filteredEmployees = [...employees];
        console.log('✅ Successfully loaded JSON data:', employees[0]);
    } catch (error) {
        console.log('❌ Error loading JSON, using mock data:', error);
        employees = getMockEmployees();
        filteredEmployees = [...employees];
    }
}


function getMockEmployees() {
    return [
        { id: 1, firstName: "Rahul", lastName: "Sharma", email: "rahul.sharma@ajackus.com", department: "Engineering", role: "Developer" },
        { id: 2, firstName: "Priya", lastName: "Patel", email: "priya.patel@ajackus.com", department: "Marketing", role: "Manager" },
        { id: 3, firstName: "Amit", lastName: "Kumar", email: "amit.k@ajackus.com", department: "Sales", role: "Executive" },
        { id: 4, firstName: "Neha", lastName: "Gupta", email: "neha.gupta@ajackus.com", department: "HR", role: "Manager" },
        { id: 5, firstName: "Arjun", lastName: "Reddy", email: "arjun.r@ajackus.com", department: "Engineering", role: "Developer" },
        { id: 6, firstName: "Anjali", lastName: "Desai", email: "anjali.d@ajackus.com", department: "Finance", role: "Analyst" },
        { id: 7, firstName: "Rajesh", lastName: "Verma", email: "rajesh.v@ajackus.com", department: "Engineering", role: "Manager" },
        { id: 8, firstName: "Meera", lastName: "Iyer", email: "meera.i@ajackus.com", department: "Marketing", role: "Designer" },
        { id: 9, firstName: "Vikram", lastName: "Singh", email: "vikram.s@ajackus.com", department: "Sales", role: "Executive" },
        { id: 10, firstName: "Pooja", lastName: "Malhotra", email: "pooja.m@ajackus.com", department: "HR", role: "Executive" }
    ];
}

function renderDashboard() {
    const dashboardContent = document.getElementById('dashboardContent');
    dashboardContent.innerHTML = getDashboardHTML();
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchEmployees);
    
    renderEmployees();
}

function getDashboardHTML() {
    return `
        <div class="controls-section">
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="Search by name or email...">
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="showAddForm()">Add Employee</button>
                <button class="btn btn-secondary" onclick="toggleFilterPanel()">Filters</button>
            </div>
        </div>

        <div class="sort-controls">
            <label>Sort by:</label>
            <select id="sortSelect" onchange="sortEmployees()">
                <option value="">None</option>
                <option value="firstName">First Name</option>
                <option value="department">Department</option>
            </select>
        </div>

        <div id="filterPanel" class="filter-panel">
            <h3>Filter Employees</h3>
            <div class="filter-group">
                <label>First Name:</label>
                <input type="text" id="filterFirstName" placeholder="Filter by first name">
            </div>
            <div class="filter-group">
                <label>Department:</label>
                <select id="filterDepartment">
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Role:</label>
                <select id="filterRole">
                    <option value="">All Roles</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Executive">Executive</option>
                </select>
            </div>
            <div class="filter-actions">
                <button class="btn btn-primary" onclick="applyFilters()">Apply Filters</button>
                <button class="btn btn-secondary" onclick="clearFilters()">Clear</button>
            </div>
        </div>

        <div id="employeeGrid" class="employee-grid"></div>

        <div class="pagination-section">
            <div class="pagination-controls">
                <button id="prevPage" onclick="previousPage()" disabled>Previous</button>
                <span id="pageInfo">Page 1 of 1</span>
                <button id="nextPage" onclick="nextPage()">Next</button>
            </div>
            <div class="page-size">
                <label>Items per page:</label>
                <select id="pageSize" onchange="changePageSize()">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    `;
}

function renderEmployees() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(start, end);
    
    const employeeGrid = document.getElementById('employeeGrid');
    employeeGrid.innerHTML = '';
    
    paginatedEmployees.forEach(employee => {
        const card = createEmployeeCard(employee);
        employeeGrid.appendChild(card);
    });
    
    updatePaginationInfo();
}

function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
        <div class="employee-id">ID: ${employee.id}</div>
        <h3 class="employee-name">${employee.firstName} ${employee.lastName}</h3>
        <div class="employee-info">
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
        </div>
        <div class="employee-actions">
            <button class="btn btn-primary" onclick="editEmployee(${employee.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
        </div>
    `;
    return card;
}

function searchEmployees() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredEmployees = employees.filter(employee => {
        return employee.firstName.toLowerCase().includes(searchTerm) ||
               employee.lastName.toLowerCase().includes(searchTerm) ||
               employee.email.toLowerCase().includes(searchTerm);
    });
    
    currentPage = 1;
    renderEmployees();
}

function toggleFilterPanel() {
    const filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('active');
}

function applyFilters() {
    const firstNameFilter = document.getElementById('filterFirstName').value.toLowerCase();
    const departmentFilter = document.getElementById('filterDepartment').value;
    const roleFilter = document.getElementById('filterRole').value;
    
    filteredEmployees = employees.filter(employee => {
        const matchesFirstName = !firstNameFilter || employee.firstName.toLowerCase().includes(firstNameFilter);
        const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
        const matchesRole = !roleFilter || employee.role === roleFilter;
        
        return matchesFirstName && matchesDepartment && matchesRole;
    });
    
    currentPage = 1;
    renderEmployees();
    toggleFilterPanel();
}

function clearFilters() {
    document.getElementById('filterFirstName').value = '';
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterRole').value = '';
    filteredEmployees = [...employees];
    currentPage = 1;
    renderEmployees();
}

function sortEmployees() {
    const sortSelect = document.getElementById('sortSelect').value;
    
    if (!sortSelect) {
        filteredEmployees = [...employees];
    } else {
        filteredEmployees.sort((a, b) => {
            if (sortSelect === 'firstName') {
                return a.firstName.localeCompare(b.firstName);
            } else if (sortSelect === 'department') {
                return a.department.localeCompare(b.department);
            }
            return 0;
        });
    }
    
    currentPage = 1;
    renderEmployees();
}

function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderEmployees();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderEmployees();
    }
}

function changePageSize() {
    itemsPerPage = parseInt(document.getElementById('pageSize').value);
    currentPage = 1;
    renderEmployees();
}

function showAddForm() {
    renderEmployeeForm();
    document.getElementById('formTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
    clearFormErrors();
    document.getElementById('employeeFormModal').classList.add('active');
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        renderEmployeeForm();
        document.getElementById('formTitle').textContent = 'Edit Employee';
        document.getElementById('employeeId').value = employee.id;
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        clearFormErrors();
        document.getElementById('employeeFormModal').classList.add('active');
    }
}

function renderEmployeeForm() {
    const formModal = document.getElementById('employeeFormModal');
    formModal.className = 'modal';
    formModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeForm()">&times;</span>
            <h2 id="formTitle">Add Employee</h2>
            <form id="employeeForm" onsubmit="saveEmployee(event)">
                <input type="hidden" id="employeeId">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input 