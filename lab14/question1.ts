function getPersonInfo(person: { name: string, age: number, isStudent: boolean }): string {
    return `Name: ${person.name}, Age: ${person.age}, IsStudent: ${person.isStudent}`;
}

console.log(getPersonInfo({ name: 'Duy Nguyen', age: 38, isStudent: true }));
