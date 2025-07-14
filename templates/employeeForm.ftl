<#-- Employee Form Freemarker Template -->
<#assign departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"]>
<#assign roles = ["Manager", "Developer", "Designer", "Analyst", "Executive"]>

<div class="modal-content">
    <span class="close" onclick="closeForm()">&times;</span>
    <h2 id="formTitle">${formTitle!'Add Employee'}</h2>
    <form id="employeeForm" onsubmit="saveEmployee(event)">
        <input type="hidden" id="employeeId" value="${employee.id!''}">
        
        <div class="form-group">
            <label for="firstName">First Name *</label>
            <input type="text" id="firstName" value="${employee.firstName!''}" required>
            <span class="error-message" id="firstNameError"></span>
        </div>
        
        <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input type="text" id="lastName" value="${employee.lastName!''}" required>
            <span class="error-message" id="lastNameError"></span>
        </div>
        
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" value="${employee.email!''}" required>
            <span class="error-message" id="emailError"></span>
        </div>
        
        <div class="form-group">
            <label for="department">Department *</label>
            <select id="department" required>
                <option value="">Select Department</option>
                <#list departments as dept>
                    <option value="${dept}" <#if employee.department?? && employee.department == dept>selected</#if>>${dept}</option>
                </#list>
            </select>
            <span class="error-message" id="departmentError"></span>
        </div>
        
        <div class="form-group">
            <label for="role">Role *</label>
            <select id="role" required>
                <option value="">Select Role</option>
                <#list roles as role>
                    <option value="${role}" <#if employee.role?? && employee.role == role>selected</#if>>${role}</option>
                </#list>
            </select>
            <span class="error-message" id="roleError"></span>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" onclick="closeForm()">Cancel</button>
        </div>
    </form>
</div>