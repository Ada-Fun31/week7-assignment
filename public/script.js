window.addEventListener('load', function () {

    // Step6. grab data from database using "fetch()"
    fetch('/data')
        .then(response => response.json())
        .then(Data => {
            console.log(Data)

            // add informations on page
            let allInfo = Data.data; 
            let randomNum = Math.floor(Math.random() * allInfo.length);

            let randomQuote = allInfo[randomNum].dreamOfday.quote;
            let randomDate = allInfo[randomNum].date;
            let randomPpl = allInfo[randomNum].dreamOfday.name;
            console.log(randomQuote);
            document.getElementById("dateOfDream").innerText =randomDate;
            document.getElementById("dream").innerText =randomPpl + " had a dream about";
            document.getElementById("words").innerText =randomQuote

        })


    // Step1. Setup event listener on button
    let quoteButton = document.getElementById("quote-button");
    quoteButton.addEventListener('click', function () {
        console.log("button clicked");

        //Step2. Grab the input box values
        let name = document.getElementById('chirp-name').value;
        let quote = document.getElementById('chirp-content').value;

        //Step3. create object using the Variable above
        //* this json structure defines the data structure in databas
        let quoteObject = {
            "name": name,
            "quote": quote
        } //*this is a javascript object 
        // console.log(quoteObject);

        //Step4. make the object JSON
        let quoteJSON = JSON.stringify(quoteObject);
        // console.log(quoteJSON)

        //Step5. send the JSON object to server
        fetch("/quoteSave", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: quoteJSON
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // 这里的data是index.js的 “response.json(message)”

                //Clear input boxes
                document.getElementById('chirp-name').value = "";
                document.getElementById('chirp-content').value = "";
            });


    });

});