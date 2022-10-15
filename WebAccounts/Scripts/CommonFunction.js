function DateName(dtStr, dtFormat, sepChar, datePart) {
    if ($.trim(dtStr) == '') return '';

	var daysInMonth = DaysArray(12)
	var dtCh = sepChar;

	var posF1 = dtFormat.indexOf(dtCh)
	var posF2 = dtFormat.indexOf(dtCh, posF1 + 1)

	var posD1 = dtStr.indexOf(dtCh)
	var posD2 = dtStr.indexOf(dtCh, posD1 + 1)

	var dtPart1 = dtFormat.substring(0, posF1);
	var dtPart2 = dtFormat.substring(posF1 + 1, posF2);
	var dtPart3 = dtFormat.substring(posF2 + 1);

	if (dtPart1.charAt(0).toLowerCase() == datePart)
		strValue = dtStr.substring(0, posD1)
	else if (dtPart2.charAt(0).toLowerCase() == datePart)
		strValue = dtStr.substring(posD1 + 1, posD2)
	else
		strValue = dtStr.substring(posD2 + 1)

	if (strValue.charAt(0) == "0" && strValue.length > 1) strValue = strValue.substring(1)

	if (datePart.toLowerCase() == "y")
		for (var i = 1; i <= 3; i++) {
			if (strValue.charAt(0) == "0" && strValue.length > 1) strValue = strValue.substring(1)
		}

	strValue = parseInt(strValue);

	return strValue;
}

function SetDateFormat(LsDate, LsDateFormat, LsSeperator) {
    LsDateFormat = LsDateFormat.toLowerCase();

    var iDate = DateName(LsDate, LsDateFormat, LsSeperator, 'd');
    var iMonth = DateName(LsDate, LsDateFormat, LsSeperator, 'm');
    var iYear = DateName(LsDate, LsDateFormat, LsSeperator, 'y');

    var monthName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var sReturn = iDate.toString() + monthName[iMonth - 1] + iYear.toString();
    return sReturn;
}
function PFDateFormat(LsDate, LsInputDateFormat, LsSeperator, LsOutputDateFormat) {
    LsInputDateFormat = LsInputDateFormat.toLowerCase();
    if (LsOutputDateFormat == null) { LsOutputDateFormat = LsInputDateFormat; }
    LsOutputDateFormat = LsOutputDateFormat.toLowerCase();

    var iDate = DateName(LsDate, LsInputDateFormat, LsSeperator, 'd');
    var iMonth = DateName(LsDate, LsInputDateFormat, LsSeperator, 'm');
    var iYear = DateName(LsDate, LsInputDateFormat, LsSeperator, 'y');

    var monthName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

    var sTmp = LsOutputDateFormat;
    sTmp = sTmp.replace('dd', '<e>');
    sTmp = sTmp.replace('d', '<d>');
    sTmp = sTmp.replace('<e>', padZero(iDate));
    sTmp = sTmp.replace('<d>', iDate);
    sTmp = sTmp.replace('mmm', '<o>');
    sTmp = sTmp.replace('mm', '<n>');
    sTmp = sTmp.replace('m', '<m>');
    sTmp = sTmp.replace('<m>', iMonth);
    sTmp = sTmp.replace('<n>', padZero(iMonth));
    sTmp = sTmp.replace('<o>', monthName[iMonth]);
    return sTmp.replace('yyyy', iYear);
}
function DaysArray(n) {
	var arrayDays = new Array(31);

	try {

		for (var i = 1; i <= n; i++) {

			if (i == 4 || i == 6 || i == 9 || i == 11) { arrayDays[i] = 30; }
			if (i == 2) { arrayDays[i] = 29; }
		}
	}
	catch (err) {
		var e = err;
	}
	return arrayDays;
}
function padZero(num) {
	return (num < 10) ? '0' + num : num;
}