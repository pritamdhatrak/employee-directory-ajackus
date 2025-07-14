<#-- Dashboard Freemarker Template -->
<#-- This template receives employee data from the backend -->
<#assign departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"]>
<#assign roles = ["Manager", "Developer", "Designer", "Analyst", "Executive"]>

<!-- Controls Section -->
<div class="controls-section">
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search by name or email...">
    </div>
    <div class="action-buttons">
        <button class="btn btn-primary" onclick="showAddForm()">Add Employee</button>
        <button class="btn btn-secondary" onclick="toggleFilterPanel()">Filters</button>
    </div>
</div>

<!-- Sort Controls -->
<div class="sort-controls">
    <label>Sort by:</label>
    <select id="sortSelect" onchange="sortEmployees()">
        <option value="">None</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
    </select>
</div>

<!-- Filter Panel -->
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
            <#list departments as dept>
                <option value="${dept}">${dept}</option>
            </#list>
        </select>
    </div>
    <div class="filter-group">
        <label>Role:</label>
        <select id="filterRole">
            <option value="">All Roles</option>
            <#list roles as role>
                <option value="${role}">${role}</option>
            </#list>
        </select>
    </div>
    <div class="filter-actions">
        <button class="btn btn-primary" onclick="applyFilters()">Apply Filters</button>
        <button class="btn btn-secondary" onclick="clearFilters()">Clear</button>
    </div>
</div>

<!-- Employee Grid -->
<div id="employeeGrid" class="employee-grid">
    <#list employees as employee>
        <div class="employee-card">
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
        </div>
    </#list>
</div>

<!-- Pagination -->
<div class="pagination-section">
    <div class="pagination-controls">
        <button id="prevPage" onclick="previousPage()" disabled>Previous</button>
        <span id="pageInfo">Page ${currentPage} of ${totalPages}</span>
        <button id="nextPage" onclick="nextPage()">Next</button>
    </div>
    <div class="page-size">
        <label>Items per page:</label>
        <select id="pageSize" onchange="changePageSize()">
            <option value="10" <#if itemsPerPage == 10>selected</#if>>10</option>
            <option value="25" <#if itemsPerPage == 25>selected</#if>>25</option>
            <option value="50" <#if itemsPerPage == 50>selected</#if>>50</option>
            <option value="100" <#if itemsPerPage == 100>selected</#if>>100</option>
        </select>
    </div>
</div>