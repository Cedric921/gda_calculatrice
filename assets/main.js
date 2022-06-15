class Calculator {
	constructor(previousOperandText, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '/':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.previousOperand = computation;
		this.operation = undefined;
		this.currentOperand = '';
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand;
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
			// this.previousOperand + ' '+ this.operation
		}
		this.previousOperandTextElement.innerText = this.previousOperand;
	}
}

const numbersButtons = document.querySelectorAll('.data-number');
const operationsButtons = document.querySelectorAll('.data-operation');
const equalsButton = document.querySelector('.data-equals');
const deleteButton = document.querySelector('.data-delete');
const allClearButton = document.querySelector('.data-all-clear');
const previousOperandTextElement = document.querySelector(
	'.data-previous-operand'
);
const currentOperandTextElement = document.querySelector(
	'.data-current-operand'
);

const calc = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

numbersButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calc.appendNumber(button.innerText);
		calc.updateDisplay();
	});
});

operationsButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calc.chooseOperation(button.innerText);
		calc.updateDisplay();
	});
});

equalsButton.addEventListener('click', () => {
	calc.compute();
	calc.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
	calc.clear();
	calc.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
	calc.delete();
	calc.updateDisplay();
});
