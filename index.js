//connecting html and js
const dobInput = document.querySelector("#dob");
const showBtn = document.querySelector("#show-btn");
const result = document.querySelector("#result");


function reversedStr(str) {
    var charList = str.split("")
    var reversedList = charList.reverse("")
    var joinList = reversedList.join("")

    return joinList
}

function isPalindrome(str) {
    var reverse = reversedStr(str);

    return str === reverse;
}


function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString()
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString()
    }
    dateStr.year = date.year.toString()

    return dateStr
}



function getAllDateFormats(date) {
    var dateStr = (convertDateToString(date))

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, ddmmyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date) {
    var listOfDates = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < listOfDates.length; i++) {
        if (isPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }
    return flag
}

// is leap year function
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 200 === 0) {
        return true;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// gets next date
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // check for february
    if (month === 2) {
        // call leap year function
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    // check for other months
    else {
        //   cheeck if day exceeds the max day in months
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    // increment year if month is greater than 12
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}



// get next palindrome date
function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isNextPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isNextPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate]
}





//  calling the functions in button
function clickHandler() {
    var bdayStr = dobInput.value

    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-')
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        //  OUTPUT
        if (isPalindrome) {
            result.innerText = "Yay your Birthday is a Palindrome 😊"
        } else {

            var [ctr, nextDate] = getNextPalindromeDate(date);

            result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
        }
    } else {
        result.innerText = "PLEASE FILL IN THE DATE 😠"
    }
}


showBtn.addEventListener("click", clickHandler);