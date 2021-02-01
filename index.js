// Your code here
// arr = [firstName, familyName, title, payPerHour] 
function createEmployeeRecord(arr){
    const employee = {}
    employee.firstName = arr[0]
    employee.familyName = arr[1]
    employee.title = arr[2]
    employee.payPerHour = arr[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(array){
    const employees = []
    array.map(e => employees.push(createEmployeeRecord(e)))
    return employees
}

function createTimeInEvent(employee, date) {
    const timeIn = {}
    timeIn.type = "TimeIn"
    timeIn.hour = parseInt(date.slice(-4))
    timeIn.date = date.split(" ")[0]
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, date) {
    const timeOut = {}
    timeOut.type = "TimeOut"
    timeOut.hour = parseInt(date.slice(-4))
    timeOut.date = date.split(" ")[0]
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const clockIn = employee.timeInEvents.find(e => e.date === date).hour
    const clockOut = employee.timeOutEvents.find(e => e.date === date).hour
    return (parseInt(clockOut) - parseInt(clockIn)) / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce(
        (total, obj) => total + wagesEarnedOnDate(employee, obj.date), 0)
}

function findEmployeeByFirstName(src, firstName) {
    return src.find(employee => employee.firstName === firstName)
}

function calculatePayroll(src) {
    return src.reduce(
        (total, emp) => total + allWagesFor(emp), 0
    )
}