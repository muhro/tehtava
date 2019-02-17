function etsi () {



  let haku = document.getElementById('haku').value
  if(haku === ''){
    location.reload();
  }

  //hakee apista saapuvat ja lähtevät juant 15 aikavälillä, käyttää inputtia hyödyksi

  fetch(`https://rata.digitraffic.fi/api/v1/live-trains/station/${haku}?minutes_before_departure=15&minutes_after_departure=15&minutes_before_arrival=15&minutes_after_arrival=15`)
  .then(vastaus => vastaus.json())
  .then(trains => {
    console.log(trains);
    const number =  document.querySelector('.app');
    const depart =  document.querySelector('.depart');

    // luo kategoriat taulun pääle
    for(let p = 0; p < 1; p++){
      depart.innerHTML += (' <div class="row" style="border-bottom: 1px solid #aaa;">\n' +
          '\n' +
          '        <div class="columno app" + style="background-color:#fffbfd;">\n' +
          '          <h2>NUMERO</h2>\n' +
          '         </div>\n' +
          '\n' +
          '        <div class="columno depart" + style="background-color:rgba(105,126,144,0.33);">\n' +
          '          <h2>DEP / ARR</h2>\n' +
          '        </div>\n' +
          '\n' +
          '        <div class="columno depart" + style="background-color:#fffbfd;">\n' +
          '          <h2>PÄÄTEPYSÄKKI</h2>\n' +
          '        </div>\n' +
          '\n' +
          '        <div class="columno depart" + style="background-color:rgba(105,126,144,0.33);">\n' +
          '          <h2>SAAPUMISAIKA</h2>\n' +
          '        </div>\n' +
          '      </div>');}



    for (let i = 0; i < trains.length; i++) {
      for (let j = 0; j < trains[i].timeTableRows.length; j++){

        if (trains[i].timeTableRows[j].stationShortCode.includes(haku)){




          let trainCategory = trains[i].trainCategory; // commuter vai Longdistance
          let commuterLineID = trains[i].commuterLineID; // commuter junan tunniste
          let timeTableRows = trains[i].timeTableRows[j].type; // tuleva / menevä
          let stationShortCode = trains[i].timeTableRows.slice(-1)[0].stationShortCode; // Päätepysäkki
          let trainNumber = trains[i].trainNumber; // junan numero
          //tarkkan sijainnin saapumisaika
          let scheduledTime = trains[i].timeTableRows[j].scheduledTime.slice(11,16); // saapumisaika
          let cancel = trains[i].timeTableRows[i].cancelled;


          if(cancel === true) {
            schedulwwedTime = '<p class="cancelled">CANCELLED</p>';
          }

          if(trainCategory  === 'Long-distance'){
            trainCategory = 'IC ' + trainNumber;
          }



          // tulostaa aina yhden rivin missä on infot: Junan tyyppi , saapuva vai lähtevä, päätepysäkki
          number.innerHTML += (' <div class="row" style="">\n' +
              '\n' +
              '        <div class="column app"  + style="background-color:#fffbfd;">\n' +
              '          <h2>' + trainCategory +' '+ commuterLineID + '</h2>\n' +
              '         </div>\n' +
              '\n' +
              '        <div class="column depart" + style="background-color:rgba(105,126,144,0.33);">\n' +
              '          <h2>' + timeTableRows + '</h2>\n' +
              '         </div>\n' +
              '\n' +
              '       <div class="column depart" + style="background-color:#fffbfd;">\n' +
              '          <h2>' + stationShortCode + '</h2>\n' +
              '         </div>\n' +
              '\n' +
              '       <div class="column depart" + style="background-color:rgba(105,126,144,0.33);">\n' +
              '          <h2>' + scheduledTime + '</h2>\n' +
              '         </div>\n' +
              '      </div>');

        }}}
  })
}


const nappi = document.getElementById('nappi');
let maara = 0;
nappi.addEventListener('click', () => {

  if(maara === 0){
    etsi();
    maara++;
  }else{
    location.reload();
  }
});