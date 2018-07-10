
document.getElementById('loan-form').addEventListener('submit', e => {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    setTimeout(calculateResult, 2000);
    e.preventDefault();
});

function calculateResult() {

    const amount = document.getElementById('amount'),
        interest = document.getElementById('interest'),
        years = document.getElementById('years'),
        monthlyPayment = document.getElementById('monthly-payment'),
        totalPayment = document.getElementById('total-payment'),
        totalInterest = document.getElementById('total-interest');
    const amountValue = parseFloat(amount.value),
        interestValue = parseFloat(interest.value) / 100 /12,
        yearsValue = parseFloat(years.value) * 12;

        // Calculations
        const x = Math.pow(1 + interestValue, yearsValue);
        const monthly = (amountValue * x * interestValue)/(x-1);

        if(isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * yearsValue).toFixed(2);
            totalInterest.value = ((monthly * yearsValue)-amountValue).toFixed(2);
            document.getElementById('loader').style.display = 'none';
            document.getElementById('results').style.display = 'block';
            document.getElementById('loan-form').reset();
            amount.focus();
            showError('Calculated ', 'alert-success' );

        } else {
            showError('Please check your values', 'alert-danger');
        }
}
function showError(msg, msgClass) {
    document.getElementById('loader').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = ` alert ${msgClass}`;
    errorDiv.appendChild(document.createTextNode(msg));
    card.insertBefore(errorDiv, heading);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}
