const dayjs = require('dayjs');


function calculateAge(data) {
    today = new Date()
    let dateOfBirth = new Date(data.dateOfBirth)

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    const dayDifference = today.getDate() - dateOfBirth.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    data["events"] = {data:{age:age}};

    const birthdayThisYear = dayjs(new Date(today.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()));

    data["events"]['start'] = birthdayThisYear.toDate()
    data["events"]['end'] = birthdayThisYear.toDate()
    data["events"]["title"] = data["fullName"]

    return data
}
function upcoming_birthdays(birthdays) {
    const today = new Date();

    // Helper function to format the date
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    // Convert and sort birthdays by date
    const sortedBirthdays = birthdays.map(birthday => {
        const birthdayDate = new Date(birthday.dateOfBirth);
        const nextBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());

        // If the birthday this year has already passed, use next year's date
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        return { ...birthday, nextBirthday };
    }).sort((a, b) => a.nextBirthday - b.nextBirthday);

    // Get the 3 closest birthdays
    const closestBirthdays = sortedBirthdays.slice(0, 3);

    // Create a new list with the required format
    const result = closestBirthdays.map(birthday => ({
        fullName: birthday.fullName,
        formattedDate: formatDate(birthday.nextBirthday)
    }));
    console.log("result")
    console.log(result)

    return result;
}

// Exportar ambas funciones como propiedades de un objeto
module.exports = {
    calculateAge,
    upcoming_birthdays
};