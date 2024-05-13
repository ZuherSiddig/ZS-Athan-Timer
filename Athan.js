
let cities = [

        {
            arabName: "الخرطوم",
            name: "Khartoum (Al Kharţūm)"
        },
        {
            arabName: "الجزيرة",
            name: "Gezira (Al Jazīrah)"
        },
        {
            arabName: "عطبرة",
            name: "Northern (Ash Shamālīyah)"
        },
        {
            arabName: "الابيض",
            name: "North Kordofan (Shamāl Kurdufān)"
        },
        {
            arabName: "كادوقلي",
            name: "South Kordofan (Janūb Kurdufān)"
        },
        {
            arabName: "النهود",
            name: "West Kordofan (Gharb Kurdufān)"
        },
        {
            arabName: "سنار",
            name: "Sennar (Sinnār)"
        },
        {
            arabName: "القضارف",
            name : "Gedaref (Al Qaḑārif)"
        },
        {
            arabName: "زالنجي",
            name: "Central Darfur (Zalingei) (Wasaţ Dārfūr (Zālinjay))"
        }
   ]
    for (let city of cities){
            const content =  `
                <option>${city.arabName}</option>
                
        `
        document.getElementById("cities-name").innerHTML += content
        
    }

     document.getElementById("cities-name").addEventListener("change", function() {
         document.getElementById("t-title").innerHTML = this.value
            let cityname = ""
            for (let city of cities){
                    if(city.arabName == this.value){
                        cityname = city.name
                    }
            }
            getPrayersTimingsOfCity(cityname)
                console.log(this.value)
     })
   

     function getPrayersTimingsOfCity(cityName){
                    
                let param = {
                    country: "SD",       
                    city: cityName     
                }

                axios.get('http://api.aladhan.com/v1/timingsByCity', {

                    params: param
                    
                    
                })
                .then(function (response) {
                    const timings = response.data.data.timings
                    prayerTimings ("fajr-time", timings.Fajr) 
                    prayerTimings ("shroq-time", timings.Sunrise) 
                    prayerTimings ("thor-time", timings.Dhuhr) 
                    prayerTimings ("asr-time", timings.Asr) 
                    prayerTimings ("sunset-time", timings.Sunset) 
                    prayerTimings ("isha-time", timings.Isha) 

                    const readAble = response.data.data.date.readable
                    const weekDay = response.data.data.date.hijri.weekday.ar
                    const date = weekDay +  " " +  readAble
                    document.getElementById("day-week").innerHTML =  date
                    console.log(date);
                   
                })
                .catch(function (error) {
                    console.log(error);
                })
     }

     getPrayersTimingsOfCity("Khartoum (Al Kharţūm)")

  
    function prayerTimings (id,time){
        document.getElementById(id).innerHTML = time
    }

