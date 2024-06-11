//link- https://api.jquery.com/category/traversing/filtering/
//Tree Traversal https://api.jquery.com/category/traversing/tree-traversal/

// Calc-Car

$(document).ready(function() {
    // Variables
    let modelSpecs,
        modelPrice,
        modelSpecsHolder,
        modelPriceHolder,
        modelPriceUSDHolder;
    
    // Get HTML elements
    modelSpecsHolder = $('#modelSpecs');
    modelPriceHolder = $('#modelPrice');
    modelPriceUSDHolder = $('#modelPriceUSD');

    modelSpecs = '';
    modelPrice = 0;

    // Changes in the form and update price and specifications
    $('#autoForm input').on('change', function() {
        completeSpecs();
        calcPrice();
        calcUSD();
    });

    // Call to display default values
    completeSpecs();
    calcPrice();
    calcUSD();

    // Click on color selection and update image
    $('#colorsSelector .colorItem').on('click', function() {
        var imgPath = $(this).attr('data-img-path');
        $('#imgHolder img').attr('src', imgPath);
    });

    // Click button and call alert
    $( "#button" ).on( "click", function() {
        alert( "Your order is purchase successful." );
    } );

    // Function to calculate the price based on selected options
    function calcPrice() {
        let modelPriceMotor = $('input[name=engine]:checked', '#autoForm').val();
        let modelPriceTrans = $('input[name=transmission]:checked', '#autoForm').val();
        let modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

        modelPriceMotor = parseInt(modelPriceMotor) || 0;
        modelPriceTrans = parseInt(modelPriceTrans) || 0;
        modelPricePackage = parseInt(modelPricePackage) || 0;

        modelPrice = modelPriceMotor + modelPriceTrans + modelPricePackage;
        modelPriceHolder.text('SEK: ' + addSpace(modelPrice)); 
    }
    
    // Funktion to complete specifications based on selected options
    function completeSpecs() {
        let motorText = $('input[name=engine]:checked + label', '#autoForm').text() || '';
        let transText = $('input[name=transmission]:checked + label', '#autoForm').text() || '';
        let packageText = $('input[name=package]:checked + label', '#autoForm').text() || '';

        modelSpecs = motorText;
        modelSpecs += motorText && transText ? ', ' + transText : transText;
        modelSpecs += motorText || transText ? ' ' + packageText : packageText;
        modelSpecsHolder.text(modelSpecs);
    }

    // Function to add spaces between each thousands
    function addSpace(nStr) {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return x1 + x2;
    }

    // API key and URL to retrieve exchange rate
    let currencyUrl = 'https://v6.exchangerate-api.com/v6/47620c96b5dc53f3680ed238/latest/USD';
    var sekUsdRate = 0;

    // Get exchange rate from API
    $.ajax({
        url: currencyUrl,
        cache: false,
        success: function(response) {
        sekUsdRate = response.conversion_rates.SEK;
        calcUSD();
        }
    });
});
  
