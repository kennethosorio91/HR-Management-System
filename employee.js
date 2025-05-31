const DEPARTMENTS = ['Design R&D', 'Human Resources', 'Finance', 'Marketing'];

// Utility functions
const getEmployeeData = () => JSON.parse(sessionStorage.getItem('employeeData') || '[]');
const saveEmployeeData = data => sessionStorage.setItem('employeeData', JSON.stringify(data));

// Event handlers
const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
};

const handleAddEmployee = event => {
    event.preventDefault();
    const form = event.target;
    const employeeData = getEmployeeData();
    
    const newEmployee = {
        id: employeeData.length + 1,
        name: form.employeeName.value,
        position: form.position.value,
        department: form.department.value,
        email: form.email.value,
        salary: parseFloat(form.salary.value),
        status: 'Active'
    };
    
    saveEmployeeData([...employeeData, newEmployee]);
    loadEmployeeData();
    hideAddEmployeeForm();
    form.reset();
};

// UI functions
const loadEmployeeData = () => {
    const tableBody = document.querySelector('.employee-table tbody');
    tableBody.innerHTML = getEmployeeData().map(employee => `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.email}</td>
            <td>$${employee.salary.toLocaleString()}</td>
            <td class="action-cell">
                <button class="status-btn ${employee.status === 'On Leave' ? 'on-leave' : ''}" 
                        onclick="toggleStatus(${employee.id})">
                    ${employee.status}
                </button>
                <button class="delete-btn" onclick="deleteEmployee(${employee.id})">×</button>
            </td>
        </tr>
    `).join('');
};

const showAddEmployeeForm = () => {
    const overlay = document.getElementById('addEmployeeOverlay');
    const departmentSelect = document.getElementById('department');
    
    overlay.style.display = 'flex';
    departmentSelect.innerHTML = DEPARTMENTS.map(dept => 
        `<option value="${dept}">${dept}</option>`
    ).join('');
};

const hideAddEmployeeForm = () => {
    document.getElementById('addEmployeeOverlay').style.display = 'none';
    document.getElementById('addEmployeeForm').reset();
};

// Data manipulation functions
const toggleStatus = employeeId => {
    const employeeData = getEmployeeData();
    const employeeIndex = employeeData.findIndex(emp => emp.id === employeeId);
    
    if (employeeIndex !== -1) {
        employeeData[employeeIndex].status = 
            employeeData[employeeIndex].status === 'Active' ? 'On Leave' : 'Active';
        saveEmployeeData(employeeData);
        loadEmployeeData();
    }
};

const deleteEmployee = employeeId => {
    if (confirm('Are you sure you want to delete this employee?')) {
        const employeeData = getEmployeeData();
        saveEmployeeData(employeeData.filter(emp => emp.id !== employeeId));
        loadEmployeeData();
    }
};

// Initialize
window.onload = loadEmployeeData; 