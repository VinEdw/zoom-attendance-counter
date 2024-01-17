function getInputValue(inputElement) {
  return parseInt(inputElement.value, 10) || 0
}

function getValues() {
  const obj = {};
  // Get the total number of participants
  const totalParticipants = document.querySelector("#total-participants");
  obj.totalParticipants = getInputValue(totalParticipants);
  // Get the number of devices present
  const devicesAtKH = document.querySelector("#devices-at-kh");
  obj.devicesAtKH = getInputValue(devicesAtKH);
  // Get any extras to add or subtract
  const extras = document.querySelector("#extras");
  obj.extras = getInputValue(extras);
  // Get the poll responses
  obj.pollResponses = [];
  for (let i = 0; i < 7; i++) {
    const id = `${i + 1}-responses`;
    const response = document.getElementById(id);
    obj.pollResponses.push(getInputValue(response));
  }
  return obj;
}

function setOutputValue(outputElement, value) {
  outputElement.textContent = value || "___";
}

function updateValues() {
  const values = getValues();
  // Set the total number of poll respondents
  const pollRespondentsElem = document.querySelector("#poll-respondents");
  const pollRespondents = values.pollResponses.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  setOutputValue(pollRespondentsElem, pollRespondents);
  // Set each response total after performing the necessary multiplication
  const responseTotals = [];
  for (let i = 0; i < 7; i++) {
    const total = values.pollResponses[i] * (i + 1);
    responseTotals.push(total);
    const id = `${i + 1}-total`;
    const totalElem = document.getElementById(id);
    setOutputValue(totalElem, total);
  }
  // Set the group B total
  const groupBTotalElem = document.querySelector("#group-b-total");
  const groupBTotal = responseTotals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  setOutputValue(groupBTotalElem, groupBTotal);
  // Set the group A total
  const groupATotalElem = document.querySelector("#group-a-total");
  const groupATotal = values.totalParticipants - values.devicesAtKH - pollRespondents + values.extras;
  setOutputValue(groupATotalElem, groupATotal);
  // Set the final total
  const totalElem = document.querySelector("#total");
  const total = groupATotal + groupBTotal;
  setOutputValue(totalElem, total);
}

const inputElems = document.querySelectorAll('input[type="number"]');
for (const elem of inputElems) {
  elem.addEventListener("change", updateValues);
}
