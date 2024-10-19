class Question {
    qid: number;
    answer: string;

    constructor(qid: number, answer: string) {
        this.qid = qid; // Unique question id
        this.answer = answer; // Correct answer
    }

    // Returns true if the answer is correct
    checkAnswer(answer: string): boolean {
        return this.answer === answer;
    }
}

class Student {
    studentId: number;
    answers: Question[];

    constructor(studentId: number) {
        this.studentId = studentId; // Unique student id
        this.answers = [];
    }

    addAnswer(question: Question): void {
        this.answers.push(question);
    }
}

class Quiz {
    questions: Map<number, string>;
    students: Student[];

    constructor(questions: Question[], students: Student[]) {
        this.questions = new Map(questions.map(q => [q.qid, q.answer]));
        this.students = students; // Array to hold all students
    }

    scoreStudentBySid(sid: number): number {
        const student = this.students.find(s => s.studentId === sid);
        if (!student) return 0;

        let score = 0;
        student.answers.forEach(ans => {
            const correctAnswer = this.questions.get(ans.qid);
            if (correctAnswer && ans.checkAnswer(correctAnswer)) {
                score++;
            }
        });
        return score;
    }

    getAverageScore(): number {
        const totalScores = this.students.reduce((total, student) => total + this.scoreStudentBySid(student.studentId), 0);
        return totalScores / this.students.length;
    }
}

// Example usage
const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students: Student[] = [student1, student2];
const questions: Question[] = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];

const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); // Expected Result: 3

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); // Expected Result: 2

let average = quiz.getAverageScore();
console.log(average); // Expected Result: 2.5
