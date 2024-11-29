// Логіни та паролі
const users = {
    'teacher': { password: '1234', role: 'teacher' },
    'student': { password: '1234', role: 'student' },
    'admin': { password: 'admin123', role: 'admin' },
};

let currentUser = null;

const studentsList = [
    "Антонюк Анна Володимирівна", "Антонян Давид Арменович", "Банзерук Тетяна Миколаївна", "Бойко Павло Володимирович",
    "Винничук Анастасій Віталійович", "Волошкін Олег Романович", "Гаврук Денис Михайлович", "Гапончук Дмитро Миколайович",
    "Герасимюк Наталія Сергіївна", "Довгополюк Олексій Миколайович", "Дудянов Павло Олександрович", "Карпович Олександр Дмитрович",
    "Квач Валерія Сергіївна", "Кулюк Ганна Юріївна"
];

const studentsData = {
    "1": [
        { name: "Антонюк Анна Володимирівна", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
        { name: "Антонян Давид Арменович", marks: [9, 8, 7, 8, 7, 9, 6, 5, 8, 7], average: 0 },
        { name: "Банзерук Тетяна Миколаївна", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Бойко Павло Володимирович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Винничук Анастасій Віталійович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Волошкін Олег Романович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Гаврук Денис Михайлович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Гапончук Дмитро Миколайович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Герасимюк Наталія Сергіївна", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Довгополюк Олексій Миколайович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Дудянов Павло Олександрович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Карпович Олександр Дмитрович", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Квач Валерія Сергіївна", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
	{ name: "Кулюк Ганна Юріївна", marks: [8, 9, 10, 7, 9, 8, 9, 10, 9, 8], average: 0 },
    ]
};

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('journal-page').style.display = 'block';
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

function loadTable() {
    const group = document.getElementById('group').value;
    const subject = document.getElementById('subject').value;

    const tableBody = document.getElementById('students-table-body');
    tableBody.innerHTML = '';

    const data = studentsData[group];
    
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        student.marks.forEach((mark, i) => {
            const markCell = document.createElement('td');
            markCell.textContent = mark;
            if (currentUser.role === 'teacher') {
                markCell.contentEditable = true;
                markCell.addEventListener('input', function() {
                    student.marks[i] = parseInt(markCell.textContent) || 0;
                    calculateAverage(student);
                });
            }
            row.appendChild(markCell);
        });

        const averageCell = document.createElement('td');
        averageCell.textContent = calculateAverage(student);
        row.appendChild(averageCell);
        
        tableBody.appendChild(row);
    });

    document.getElementById('save-button').style.display = currentUser.role === 'teacher' ? 'inline-block' : 'none';
}

function calculateAverage(student) {
    const sum = student.marks.reduce((acc, mark) => acc + mark, 0);
    const average = (sum / student.marks.length).toFixed(2);
    student.average = average;
    return average;
}

function saveData() {
    // збереження даних (можна додати збереження в файл чи базу даних)
    alert('Зміни збережено!');
}
