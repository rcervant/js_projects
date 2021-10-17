// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

function calculateResults(){
    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    
    document.getElementById('loading').style.display = 'none';

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers');
    }
}

function showError(error) {
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger mt-3';

    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    // card.insertBefore(errorDiv, heading);
    card.appendChild(errorDiv);
    document.getElementById('loading').style.display = 'none';

    // Clear error after 3 seconds
    // setTimeout(clearError, 3000);
    document.body.addEventListener('click', function(e){
       if (document.querySelector(".alert")){
         document.querySelector(".alert").remove(); 
       }
    });
}

// function clearError(){
//     document.querySelector('.alert').remove();
// }