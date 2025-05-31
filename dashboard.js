const initialEmployees = [
    {
        id: 1,
        name: "John Doe",
        position: "Fabrication Technician",
        department: "Design R&D",
        email: "john.doe@example.com",
        salary: 5000,
        status: "Active"
    },
    {
        id: 2,
        name: "Jane Smith",
        position: "HR Manager",
        department: "Human Resources",
        email: "jane.smith@example.com",
        salary: 6000,
        status: "Active"
    },
    {
        id: 3,
        name: "Robert Johnson",
        position: "Financial Analyst",
        department: "Finance",
        email: "robert.johnson@example.com",
        salary: 5500,
        status: "On Leave"
    }
];

function updateDashboardStats() {
    const employeeData = JSON.parse(sessionStorage.getItem('employeeData') || '[]');
    const stats = {
        total: employeeData.length,
        payroll: employeeData.reduce((sum, emp) => sum + emp.salary, 0),
        active: employeeData.filter(emp => emp.status === 'Active').length
    };

    document.querySelector('.total-employees .stat-value').textContent = stats.total;
    document.querySelector('.monthly-payroll .stat-value').textContent = `$${stats.payroll.toLocaleString()}`;
    document.querySelector('.active-rate .stat-value').textContent = 
        `${stats.total ? ((stats.active / stats.total) * 100).toFixed(1) : 0}%`;
}

// Initialize and update
!sessionStorage.getItem('employeeData') && sessionStorage.setItem('employeeData', JSON.stringify(initialEmployees));
window.onload = updateDashboardStats; 