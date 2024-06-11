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
        var modelPriceMotor = $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTrans = $('input[name=transmission]:checked', '#autoForm').val();
        var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

        modelPriceMotor = parseInt(modelPriceMotor) || 0;
        modelPriceTrans = parseInt(modelPriceTrans) || 0;
        modelPricePackage = parseInt(modelPricePackage) || 0;

        modelPrice = modelPriceMotor + modelPriceTrans + modelPricePackage;
        modelPriceHolder.text('SEK: ' + addSpace(modelPrice)); 
    }
    
    // Funktion to complete specifications based on selected options
    function completeSpecs() {
        var motorText = $('input[name=engine]:checked + label', '#autoForm').text() || '';
        var transText = $('input[name=transmission]:checked + label', '#autoForm').text() || '';
        var packageText = $('input[name=package]:checked + label', '#autoForm').text() || '';

        modelSpecs = motorText;
        modelSpecs += motorText && transText ? ', ' + transText : transText;
        modelSpecs += motorText || transText ? ' ' + packageText : packageText;
        modelSpecsHolder.text(modelSpecs);
    }
    
});
  
