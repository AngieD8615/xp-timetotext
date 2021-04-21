"use strict";

function time2text(time) {
  // input "HH:MM"
  const timeArr = time.split(":");
  let hour = timeArr[0];
  let hourInt = Number(hour);
  let min = timeArr[1];
  // midnight and noon special cases
  if ((hour === "00" || hour === "24") && min === "00") return "midnight";
  if (hour === "12" && min === "00") return "noon";

  let suffix = "";
  if (hour < 12) {
    suffix = "in the morning";
  } else if (hour < 18) {
    suffix = "in the afternoon";
  } else {
    suffix = "in the evening";
  }

  let hourBase12 = hourInt <= 12 ? hourInt : hourInt - 12;
  let hourStr =
    oneTo15Mapping(hourBase12) === "zero"
      ? "twelve"
      : oneTo15Mapping(hourBase12);

  const minuteEdgeCases = ["05","10","15","20","30","40","45","50","55"];
  let minutePhrase = "";
  if (minuteEdgeCases.includes(min) && Number(min) <= 30) {
    if (["05", "10", "20"].includes(min)) {
      let minStr = min === "05" ? oneTo15Mapping(min) : convertMinToText(min);
      minutePhrase = `${minStr}`;
    } else if (min === "30") {
      minutePhrase = `half`;
    } else if (min === "15") {
      minutePhrase = `quarter`;
    }
    if (hour === "00") return `${minutePhrase} past midnight`;
    if (hour === "12") return `${minutePhrase} past noon`;
    return `${minutePhrase} past ${hourStr} ${suffix}`;
  } else if (minuteEdgeCases.includes(min)) {
    if (["40", "50", "55"].includes(min)) {
      let minStr =
        min === "55" ? oneTo15Mapping(60 - min) : convertMinToText(60 - min);
      minutePhrase = `${minStr}`;
    } else if (min === "45") {
      minutePhrase = `quarter`;
    }
    if (hour === "23") return `${minutePhrase} to midnight`;
    if (hour === "11") return `${minutePhrase} to noon`;

    hourBase12 = hourInt + 1 <= 12 ? hourInt + 1 : hourInt - 11;
    hourStr = oneTo15Mapping(hourBase12);
    if (hourStr === "six" && hour === "17") suffix = "in the evening";
    return `${minutePhrase} to ${hourStr} ${suffix}`;
  }

  
  if (min === "00") {
    return hourStr + " o'clock " + suffix;
  } else {
    let minStr = convertMinToText(min);
    return hourStr + " " + minStr + " " + suffix;
  }
}

function oneTo15Mapping(num) {
  num = Number(num);
  let mapping = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
  };

  return mapping[num];
}

function sixteenTo59Mapping(num) {
  let strNum;
  if (num < 16) {
    console.log("invalid num");
    return;
  }
  const tensWords = [
    "",
    "",
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  let tens = Math.floor(num / 10);
  let ones = num % 10;

  if (tens === 1) {
    strNum = oneTo15Mapping(ones) + "teen";
    if (strNum === "eightteen") strNum = "eighteen";
  } else {
    if (ones === 0) {
      strNum = tensWords[tens];
    } else {
      strNum = tensWords[tens] + "-" + oneTo15Mapping(ones);
    }
  }
  return strNum;
}

function convertMinToText(digit) {
  let result = [];

  if (digit[0] === "0") {
    result.push("oh");
    result.push(oneTo15Mapping(digit[1]));
    return result.join(" ");
  } else if (digit < 16) {
    return oneTo15Mapping(Number(digit));
  } else {
    return sixteenTo59Mapping(Number(digit));
  }
}

module.exports = time2text;
