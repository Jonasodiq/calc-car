//link- https://api.jquery.com/category/traversing/filtering/
//Tree Traversal https://api.jquery.com/category/traversing/tree-traversal/

// Calc-Car

$(document).ready(function() {

    // Variables
    let modelSpecs = '';
    let modelPrice = 0;
    let sekUsdRate = 0;
    
    // Get HTML elements
    const modelSpecsHolder = $('#modelSpecs');
    const modelPriceHolder = $('#modelPrice');
    const modelPriceUSDHolder = $('#modelPriceUSD');

    // Event listeners
    $('#autoForm input').on('change', function() {
        completeSpecs();
        calcPrice();
        calcUSD();
    });

    // Click on color selection and update image
    $('#colorsSelector .colorItem').on('click', function() {
        const imgPath = $(this).attr('data-img-path');
        $('#imgHolder img').attr('src', imgPath);
    });

    // Click button and call alert
    $( "#button" ).on( "click", function() {
        alert( "Your order is purchase successful." );
    } );

    // Call to display default values
    completeSpecs();
    calcPrice();
    calcUSD();

    // Fetch exchange rate from API
    const currencyUrl = 'https://v6.exchangerate-api.com/v6/47620c96b5dc53f3680ed238/latest/USD';
    
    $.ajax({
        url: currencyUrl,
        cache: false,
        success: function(response) {
        sekUsdRate = response.conversion_rates.SEK;
        calcUSD();
        }
    });

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

        modelSpecs = [motorText, transText, packageText].filter(Boolean).join(', ');
        modelSpecsHolder.text(modelSpecs);
    }

    // Function to add spaces between each thousands
    function addSpace(nStr) {
        return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    

    // Function to convert price from SEK to USD and update the HTML element
    function calcUSD() {
        let modelPriceUSD = modelPrice / sekUsdRate;
        modelPriceUSDHolder.text('USD: ' + addSpace(modelPriceUSD.toFixed(0))); // Pris i USD
    }
});


// 1. Variabler och HTML-element:
    // Variabler: modelSpecs, modelPrice, sekUsdRate för att hålla specifikationer, pris och växelkurs.
    // HTML-element: modelSpecsHolder, modelPriceHolder, modelPriceUSDHolder refererar till elementen där dessa värden visas.

// 2. Eventlyssnare:
    // Formulärändringar: När användaren ändrar val i formuläret (#autoForm input), uppdateras specifikationer, pris i SEK och USD.
    // Färgändring: Klick på en färgändring (#colorsSelector .colorItem) uppdaterar bilens bild.
    // Beställningsknapp: Klick på knappen (#button) visar ett bekräftelsemeddelande.

// 3. Initial Uppdatering:
    // Vid sidladdning anropas updateSpecs(), updatePrice(), och updateUSD() för att visa standardvärden.

// 4. API-anrop för Växelkurs:
    // Ett AJAX-anrop hämtar växelkursen SEK till USD och lagrar det i sekUsdRate.

// 5. Funktioner:
    // updatePrice: Beräknar och uppdaterar priset i SEK baserat på valda alternativ.
    // updateSpecs: Uppdaterar och visar valda bilspecifikationer.
    // formatPrice: Formaterar priset med mellanslag mellan tusental.
    // updateUSD: Konverterar priset från SEK till USD och uppdaterar det i HTML.

    // Sammanfattning
    // Detta skript gör det möjligt för användare att konfigurera en bil på en webbsida
    // genom att välja olika alternativ och se specifikationer och priser uppdateras i realtid.
    // Det inkluderar hantering av användarval, prisberäkning, valutakonvertering och visning av valda specifikationer.