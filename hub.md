---
layout: default
title: Hub
permalink: /hub/
---
# Hub
Explore items for sale or trade by location and category.
## Browse by Location
Select a location to view available listings.
---
<div class="container-location">
  <h1>Location Selector</h1>
  <form id="location-form">
    <label for="region">Region:</label>
    <select id="region" name="region" aria-label="Select a region" class="full-width">
      <option value="">Select Region</option>
      <option value="north-america">North America</option>
      <option value="canada">Canada</option>
      <option value="europe">Europe</option>
      <option value="asia">Asia</option>
    </select>

    <label for="province-state">Province/State:</label>
    <select id="province-state" name="province-state" aria-label="Select a province or state" class="full-width" disabled>
      <option value="">Select Province/State</option>
      <!-- Options will be populated based on selected region -->
    </select>
    <label for="city-town">City/Town:</label>
    <select id="city-town" name="city-town" aria-label="Select a city or town" class="full-width" disabled>
      <option value="">Select City/Town</option>
      <!-- Options will be populated based on selected province/state -->
    </select>
  </form>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('region');
    const provinceStateSelect = document.getElementById('province-state');
    const cityTownSelect = document.getElementById('city-town');
    // Expanded list of provinces/states and cities for each region
    // Expanded list of provinces/states and cities for each region
    const provinces = {
      'north-america': [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'U.S. Territories'
      ],
      'canada': [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
        'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
        'Northwest Territories', 'Nunavut', 'Yukon'
      ],
      'europe': [
        'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Luxembourg', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'
      ],
      'asia': [
        'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China (PRC)', 'East Timor', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Macau', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'The Philippines', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'
      ]
    };
    const cities = {
      'Alabama': ['auburn', 'birmingham', 'dothan', 'florence / muscle shoals', 'gadsden-anniston', 'huntsville / decatur', 'mobile', 'montgomery', 'tuscaloosa'],
      'Alaska': ['Anchorage/Mat-Su', 'Fairbanks', 'Kenai Peninsula', 'Southeast Alaska'],
      'Arizona': ['Flagstaff/Sedona', 'Mohave County', 'Phoenix', 'Prescott', 'Show Low', 'Sierra Vista', 'Tucson', 'Yuma'],
      'Arkansas': ['fayetteville', 'fort smith', 'jonesboro', 'little rock', 'texarkana'],
      'California': ['Bakersfield', 'Chico', 'Fresno/Madera', 'Gold Country', 'Hanford-Corcoran', 'Humboldt County', 'Imperial County', 'Inland Empire', 'Los Angeles', 'Mendocino County', 'Merced', 'Modesto', 'Monterey Bay', 'Orange County', 'Palm Springs', 'Redding', 'Sacramento', 'San Diego', 'San Francisco Bay Area', 'San Luis Obispo', 'Santa Barbara', 'Santa Maria', 'Siskiyou County', 'Stockton', 'Susanville', 'Ventura County', 'Visalia-Tulare', 'Yuba-Sutter'],
      'Colorado': ['Boulder', 'Colorado Springs', 'Denver', 'Eastern CO', 'Fort Collins/North CO', 'High Rockies', 'Pueblo', 'Western Slope'],
      'Connecticut': ['Eastern CT', 'Hartford', 'New Haven', 'Northwest CT'],
      'Delaware': ['Delaware'],
      'District of Columbia': ['Washington'],
      'Florida': ['Broward County', 'Daytona Beach', 'Florida Keys', 'Fort Lauderdale', 'Ft Myers/SW Florida', 'Gainesville', 'Heartland Florida', 'Jacksonville', 'Lakeland', 'Miami/Dade', 'North Central FL', 'Ocala', 'Okaloosa/Walton', 'Orlando', 'Panama City', 'Pensacola', 'Sarasota-Bradenton', 'South Florida', 'Space Coast', 'St Augustine', 'Tallahassee', 'Tampa Bay Area', 'Treasure Coast', 'Palm Beach County'],
      'Georgia': ['Albany', 'Athens', 'Atlanta', 'Augusta', 'Brunswick', 'Columbus', 'Macon/Warner Robins', 'Northwest GA', 'Savannah/Hinesville', 'Statesboro', 'Valdosta'],
      'Hawaii': ['Hawaii'],
      'Idaho': ['Boise', 'East Idaho', 'Lewiston/Clarkston', 'Twin Falls'],
      'Illinois': ['Bloomington-Normal', 'Champaign-Urbana', 'Chicago', 'Decatur', 'La Salle Co', 'Mattoon-Charleston', 'Peoria', 'Rockford', 'Southern Illinois', 'Springfield', 'Western IL'],
      'Indiana': ['Bloomington', 'Evansville', 'Fort Wayne', 'Indianapolis', 'Kokomo', 'Lafayette/West Lafayette', 'Muncie/Anderson', 'Richmond', 'South Bend/Michiana', 'Terre Haute'],
      'Iowa': ['Ames', 'Cedar Rapids', 'Des Moines', 'Dubuque', 'Fort Dodge', 'Iowa City', 'Mason City', 'Quad Cities', 'Sioux City', 'Southeast IA', 'Waterloo/Cedar Falls'],
      'Kansas': ['Lawrence', 'Manhattan', 'Northwest KS', 'Salina', 'Southeast KS', 'Southwest KS', 'Topeka', 'Wichita'],
      'Kentucky': ['Bowling Green', 'Eastern Kentucky', 'Lexington', 'Louisville', 'Owensboro', 'Western KY'],
      'Louisiana': ['Baton Rouge', 'Central Louisiana', 'Houma', 'Lafayette', 'Lake Charles', 'Monroe', 'New Orleans', 'Shreveport'],
      'Maine': ['Maine'],
      'Maryland': ['Annapolis', 'Baltimore', 'Eastern Shore', 'Frederick', 'Southern Maryland', 'Western Maryland'],
      'Massachusetts': ['Boston', 'Cape Cod/Islands', 'South Coast', 'Western Massachusetts', 'Worcester/Central MA'],
      'Michigan': ['Ann Arbor', 'Battle Creek', 'Central Michigan', 'Detroit Metro', 'Flint', 'Grand Rapids', 'Holland', 'Jackson', 'Kalamazoo', 'Lansing', 'Monroe', 'Muskegon', 'Northern Michigan', 'Port Huron', 'Saginaw-Midland-Bay City', 'Southwest Michigan', 'The Thumb', 'Upper Peninsula'],
      'Minnesota': ['Bemidji', 'Brainerd', 'Duluth/Superior', 'Mankato', 'Minneapolis/St Paul', 'Rochester', 'Southwest MN', 'St Cloud'],
      'Mississippi': ['Gulfport/Biloxi', 'Hattiesburg', 'Jackson', 'Meridian', 'North Mississippi', 'Southwest MS'],
      'Missouri': ['Columbia/Jeff City', 'Joplin', 'Kansas City', 'Kirksville', 'Lake of the Ozarks', 'Southeast Missouri', 'Springfield', 'St Joseph', 'St Louis'],
      'Montana': ['Billings', 'Bozeman', 'Butte', 'Great Falls', 'Helena', 'Kalispell', 'Missoula', 'Eastern Montana'],
      'Nebraska': ['Grand Island', 'Lincoln', 'North Platte', 'Omaha/Council Bluffs', 'Scottsbluff/Panhandle'],
      'Nevada': ['Elko', 'Las Vegas', 'Reno/Tahoe'],
      'New Hampshire': ['New Hampshire'],
      'New Jersey': ['Central NJ', 'Jersey Shore', 'North Jersey', 'South Jersey'],
      'New Mexico': ['Albuquerque', 'Clovis/Portales', 'Farmington', 'Las Cruces', 'Roswell/Carlsbad', 'Santa Fe/Taos'],
      'New York': ['Albany', 'Binghamton', 'Buffalo', 'Catskills', 'Chautauqua', 'Elmira-Corning', 'Finger Lakes', 'Glens Falls', 'Hudson Valley', 'Ithaca', 'Long Island', 'New York City', 'Oneonta', 'Plattsburgh-Adirondacks', 'Potsdam-Canton-Massena', 'Rochester', 'Syracuse', 'Twin Tiers NY/PA', 'Utica-Rome-Oneida', 'Watertown'],
      'North Carolina': ['Asheville', 'Boone', 'Charlotte', 'Eastern NC', 'Fayetteville', 'Greensboro', 'Hickory/Lenoir', 'Jacksonville', 'Outer Banks', 'Raleigh/Durham/CH', 'Wilmington', 'Winston-Salem'],
      'North Dakota': ['Bismarck', 'Fargo/Moorhead', 'Grand Forks', 'North Dakota'],
      'Ohio': ['Akron/Canton', 'Ashtabula', 'Athens', 'Chillicothe', 'Cincinnati', 'Cleveland', 'Columbus', 'Dayton/Springfield', 'Lima/Findlay', 'Mansfield', 'Sandusky', 'Toledo', 'Tuscarawas Co', 'Youngstown', 'Zanesville/Cambridge'],
      'Oklahoma': ['Lawton', 'Northwest OK', 'Oklahoma City', 'Stillwater', 'Tulsa'],
      'Oregon': ['Bend', 'Corvallis/Albany', 'East Oregon', 'Eugene', 'Klamath Falls', 'Medford-Ashland', 'Oregon Coast', 'Portland', 'Roseburg', 'Salem'],
      'Pennsylvania': ['Altoona-Johnstown', 'Cumberland Valley', 'Erie', 'Harrisburg', 'Lancaster', 'Lehigh Valley', 'Meadville', 'Philadelphia', 'Pittsburgh', 'Poconos', 'Reading', 'Scranton/Wilkes-Barre', 'State College', 'Williamsport', 'York'],
      'Rhode Island': ['Rhode Island'],
      'South Carolina': ['Charleston', 'Columbia', 'Florence', 'Greenville/Upstate', 'Hilton Head', 'Myrtle Beach'],
      'South Dakota': ['Northeast SD', 'Pierre/Central SD', 'Rapid City/West SD', 'Sioux Falls/SE SD', 'South Dakota'],
      'Tennessee': ['Chattanooga', 'Clarksville', 'Cookeville', 'Jackson', 'Knoxville', 'Memphis', 'Nashville', 'Tri-Cities'],
      'Texas': ['Abilene', 'Amarillo', 'Austin', 'Beaumont/Port Arthur', 'Brownsville', 'College Station', 'Corpus Christi', 'Dallas/Fort Worth', 'Deep East Texas', 'Del Rio/Eagle Pass', 'El Paso', 'Galveston', 'Houston', 'Killeen/Temple/Ft Hood', 'Laredo', 'Lubbock', 'McAllen/Edinburg', 'Odessa/Midland', 'San Angelo', 'San Antonio', 'San Marcos', 'Southwest TX', 'Texoma', 'Tyler/East TX', 'Victoria', 'Waco', 'Wichita Falls'],
      'Utah': ['Logan', 'Ogden-Clearfield', 'Provo/Orem', 'Salt Lake City', 'St George'],
      'Vermont': ['Vermont'],
      'Virginia': ['Charlottesville', 'Danville', 'Fredericksburg', 'Hampton Roads', 'Harrisonburg', 'Lynchburg', 'New River Valley', 'Richmond', 'Roanoke', 'Southwest VA', 'Winchester'],
      'Washington': ['Bellingham', 'Kennewick-Pasco-Richland', 'Moses Lake', 'Olympic Peninsula', 'Pullman/Moscow', 'Seattle-Tacoma', 'Skagit/Island/SJI', 'Spokane/Coeur d\'Alene', 'Wenatchee', 'Yakima'],
      'West Virginia': ['Charleston', 'Eastern Panhandle', 'Huntington-Ashland', 'Morgantown', 'Northern Panhandle', 'Parkersburg-Marietta', 'Southern WV', 'West Virginia (Old)'],
      'Wisconsin': ['Appleton-Oshkosh-FDL', 'Eau Claire', 'Green Bay', 'Janesville', 'Kenosha-Racine', 'La Crosse', 'Madison', 'Milwaukee', 'Northern WI', 'Sheboygan', 'Wausau'],
      'Wyoming': ['Wyoming'],
      'U.S. Territories': ['Guam-Micronesia', 'Puerto Rico', 'U.S. Virgin Islands'],
      'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Leduc'],
      'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna', 'Abbotsford', 'Coquitlam', 'Nanaimo', 'Kamloops'],
      'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Portage la Prairie', 'Thompson', 'Winkler', 'Selkirk', 'Dauphin', 'Morden', 'Flin Flon'],
      'New Brunswick': ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi', 'Edmundston', 'Bathurst', 'Campbellton', 'Shediac', 'Oromocto'],
      'Newfoundland and Labrador': ['St. John\'s', 'Corner Brook', 'Gander', 'Grand Falls-Windsor', 'Conception Bay South', 'Mount Pearl', 'Paradise', 'Labrador City', 'Stephenville', 'Happy Valley-Goose Bay'],
      'Nova Scotia': ['Halifax', 'Sydney', 'Dartmouth', 'Truro', 'New Glasgow', 'Kentville', 'Amherst', 'Bridgewater', 'Yarmouth', 'Antigonish'],
      'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor'],
      'Prince Edward Island': ['Charlottetown', 'Summerside', 'Cornwall', 'Stratford', 'Montague', 'Kensington', 'Souris', 'Alberton', 'Tignish', 'O\'Leary'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Trois-Rivières', 'Saguenay', 'Drummondville', 'Saint-Jean-sur-Richelieu'],
      'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Yorkton', 'Swift Current', 'North Battleford', 'Lloydminster', 'Estevan', 'Weyburn'],
      'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Norman Wells', 'Behchokǫ̀', 'Fort Simpson', 'Tuktoyaktuk', 'Aklavik', 'Fort Providence'],
      'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay', 'Pangnirtung', 'Igloolik', 'Kugluktuk', 'Cape Dorset', 'Hall Beach'],
      'Yukon': ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Carmacks', 'Faro', 'Mayo', 'Pelly Crossing', 'Teslin', 'Carcross'],
      'Austria': ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten', 'Dornbirn'],
      'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Mechelen'],
      'Bulgaria': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Sliven', 'Dobrich', 'Shumen'],
      'Croatia': ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Slavonski Brod', 'Pula', 'Karlovac', 'Sisak', 'Varaždin'],
      'Czech Republic': ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'Ústí nad Labem', 'Hradec Králové', 'Pardubice', 'Zlín'],
      'Denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde'],
      'Finland': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori'],
      'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
      'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
      'Greece': ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Rhodes', 'Ioannina', 'Chania', 'Kavala'],
      'Hungary': ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Szombathely'],
      'Iceland': ['Reykjavik', 'Kopavogur', 'Hafnarfjordur', 'Akureyri', 'Reykjanesbær', 'Garðabær', 'Mosfellsbær', 'Akranes', 'Selfoss', 'Hveragerði'],
      'Ireland': ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Swords', 'Bray', 'Navan'],
      'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
      'Luxembourg': ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Ettelbruck', 'Diekirch', 'Wiltz', 'Grevenmacher', 'Remich', 'Mersch'],
      'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
      'Norway': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Skien', 'Kristiansand', 'Tønsberg', 'Ålesund'],
      'Poland': ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok'],
      'Portugal': ['Lisbon', 'Porto', 'Amadora', 'Braga', 'Coimbra', 'Funchal', 'Setúbal', 'Cacém', 'Almada', 'Vila Nova de Gaia'],
      'Romania': ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova', 'Brașov', 'Galați', 'Ploiești', 'Oradea'],
      'Russian Federation': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
      'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas', 'Bilbao'],
      'Sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping'],
      'Switzerland': ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel/Bienne'],
      'Turkey': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Mersin'],
      'Ukraine': ['Kyiv', 'Kharkiv', 'Odessa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol'],
      'United Kingdom': ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Manchester', 'Leeds', 'Edinburgh', 'Bristol', 'Sheffield', 'Cardiff'],
      'Afghanistan': ['Kabul', 'Kandahar', 'Herat', 'Mazar-i-Sharif', 'Jalalabad', 'Baghlan', 'Ghazni', 'Farah', 'Pul-e-Khumri', 'Khost'],
      'Armenia': ['Yerevan', 'Gyumri', 'Vanadzor', 'Vagharshapat', 'Kapan', 'Artik', 'Hrazdan', 'Abovyan', 'Charentsavan', 'Ijevan'],
      'Azerbaijan': ['Baku', 'Ganja', 'Sumqayit', 'Lankaran', 'Mingachevir', 'Sheki', 'Shamkir', 'Zagatala', 'Saki', 'Guba'],
      'Bahrain': ['Manama', 'Riffa', 'Muharraq', 'Sitra', 'A'ali', 'Hamad Town', 'Jidhafs', 'Budaiya', 'West Riffa', 'Isa Town'],
      'Bangladesh': ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Rangpur', 'Comilla', 'Mymensingh', 'Jamalpur'],
      'Bhutan': ['Thimphu', 'Phuentsholing', 'Punakha', 'Wangdue Phodrang', 'Paro', 'Jakar', 'Mongar', 'Samdrup Jongkhar', 'Trashigang', 'Gelephu'],
      'Brunei': ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar', 'Kampong Ayer', 'Lumut', 'Muara', 'Panchor', 'Temburong'],
      'Cambodia': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Kampong Cham', 'Kep', 'Kampong Speu', 'Pursat', 'Kandal', 'Kampong Thom'],
      'China (PRC)': ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Xi\'an', 'Hangzhou', 'Wuhan', 'Nanjing', 'Hong Kong'],
      'East Timor': ['Dili', 'Baucau', 'Viqueque', 'Lospalos', 'Suai', 'Oecusse', 'Same', 'Maliana', 'Ermera', 'Ainaro'],
      'Georgia': ['Tbilisi', 'Kutaisi', 'Zugdidi', 'Batumi', 'Rustavi', 'Zestafoni', 'Poti', 'Senaki', 'Telavi', 'Gori'],
      'Hong Kong': ['Hong Kong Island', 'Kowloon', 'New Territories', 'Central', 'Causeway Bay', 'Tsim Sha Tsui', 'Mong Kok', 'Yau Ma Tei', 'Wan Chai', 'Sai Kung'],
      'India': ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow'],
      'Indonesia': ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Batam', 'Makassar', 'Denpasar', 'Semarang', 'Palembang', 'Yogyakarta'],
      'Iran': ['Tehran', 'Mashhad', 'Isfahan', 'Shiraz', 'Tabriz', 'Ahvaz', 'Kermanshah', 'Urmia', 'Zahedan', 'Yazd'],
      'Iraq': ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Kirkuk', 'Sulaymaniyah', 'Najaf', 'Kufa', 'Amara', 'Hillah'],
      'Israel': ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon Lezion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beersheba', 'Hadera', 'Ra\'anana'],
      'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya', 'Yokohama', 'Hiroshima', 'Sendai', 'Kobe', 'Fukuoka', 'Sapporo'],
      'Jordan': ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Wadi Musa', 'Mafraq', 'Salt', 'Jerash', 'Karak', 'Madaba'],
      'Kazakhstan': ['Almaty', 'Nur-Sultan', 'Shymkent', 'Karaganda', 'Aktobe', 'Pavlodar', 'Semey', 'Taraz', 'Ust-Kamenogorsk', 'Kostanay'],
      'Kuwait': ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya', 'Mangaf', 'Fahaheel', 'Shuwaikh', 'Sabah Al Salem'],
      'Kyrgyzstan': ['Bishkek', 'Osh', 'Jalal-Abad', 'Karabalta', 'Tokmok', 'Karakol', 'Naryn', 'Uzgen', 'Kemin', 'Batken'],
      'Laos': ['Vientiane', 'Luang Prabang', 'Pakse', 'Savannakhet', 'Xam Neua', 'Thakhek', 'Vang Vieng', 'Muang Xai', 'Oudomxay', 'Attapeu'],
      'Lebanon': ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Jounieh', 'Zahle', 'Byblos', 'Batroun', 'Baalbek', 'Rmeich'],
      'Macau': ['Macau Peninsula', 'Taipa', 'Cotai', 'Coloane', 'Seng Pai', 'Nape', 'San Malo', 'Hac Sa', 'Kun Iam', 'Carmo'],
      'Malaysia': ['Kuala Lumpur', 'George Town', 'Kota Kinabalu', 'Johor Bahru', 'Malacca', 'Ipoh', 'Shah Alam', 'Kuching', 'Alor Setar', 'Miri'],
      'Maldives': ['Malé', 'Hinnavaru', 'Dhangethi', 'Dhigurah', 'Thulusdhoo', 'Maafushi', 'Villingili', 'Fuvahmulah', 'Kulhudhuffushi', 'Raa Atoll'],
      'Mongolia': ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Mongolyn Tal', 'Zamiin-Uud', 'Choibalsan', 'Baganuur', 'Sainshand', 'Muran', 'Khovd'],
      'Myanmar': ['Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Sittwe', 'Pathein', 'Monywa', 'Dawei', 'Hpa-An', 'Lashio'],
      'Nepal': ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur', 'Birgunj', 'Janakpur', 'Hetauda', 'Butwal', 'Dhangadhi'],
      'North Korea': ['Pyongyang', 'Nampo', 'Wonsan', 'Kaesong', 'Sinuiju', 'Hamhung', 'Chongjin', 'Rason', 'Haeju', 'Kanggye'],
      'Oman': ['Muscat', 'Sohar', 'Salalah', 'Nizwa', 'Sur', 'Ibra', 'Barka', 'Rustaq', 'Ibri', 'Dhofar'],
      'Pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Quetta', 'Gujranwala', 'Sialkot'],
      'Palestine': ['Ramallah', 'Hebron', 'Nablus', 'Jericho', 'Bethlehem', 'Gaza City', 'Khan Yunis', 'Jenin', 'Tulkarm', 'Salfit'],
      'Qatar': ['Doha', 'Al Wakrah', 'Al Khor', 'Mesaieed', 'Umm Salal', 'Madinat ash Shamal', 'Ruwais', 'Dukhan', 'Al Rayyan', 'Al Daayen'],
      'Russia': ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Rostov-on-Don', 'Ufa'],
      'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dhahran', 'Khobar', 'Dammam', 'Buraidah', 'Tabuk', 'Abha'],
      'Singapore': ['Singapore City', 'Sentosa', 'Orchard', 'Marina Bay', 'Chinatown', 'Bugis', 'Little India', 'Raffles Place', 'Tanjong Pagar', 'East Coast'],
      'South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Jeju City', 'Ulsan', 'Changwon'],
      'Sri Lanka': ['Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna', 'Anuradhapura', 'Trincomalee', 'Batticaloa', 'Matara', 'Ratnapura'],
      'Syria': ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Deir ez-Zor', 'Daraa', 'Qamishli', 'Raqqa', 'Hama', 'Hasakah'],
      'Taiwan': ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hsinchu', 'Miaoli', 'Chiayi', 'Keelung', 'Taoyuan', 'Changhua'],
      'Tajikistan': ['Dushanbe', 'Khujand', 'Kulob', 'Istaravshan', 'Tursunzoda', 'Vahdat', 'Panjakent', 'Isfara', 'Ghafurov', 'Roudaki'],
      'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Khon Kaen', 'Nakhon Ratchasima', 'Udon Thani', 'Hua Hin', 'Nakhon Si Thammarat', 'Surat Thani'],
      'The Philippines': ['Manila', 'Quezon City', 'Cebu City', 'Davao City', 'Zamboanga City', 'Taguig', 'Pasig', 'Makati', 'Antipolo', 'Iloilo City'],
      'Turkey': ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'],
      'Turkmenistan': ['Ashgabat', 'Turkmenabat', 'Mary', 'Dashoguz', 'Balkanabat', 'Tejen', 'Kaka', 'Serdar', 'Gypjak', 'Bereket'],
      'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras al-Khaimah', 'Fujairah', 'Umm al-Quwain', 'Al Ain', 'Khor Fakkan', 'Hatta'],
      'Uzbekistan': ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Andijan', 'Namangan', 'Ferghana', 'Nukus', 'Jizzakh', 'Qarshi'],
      'Vietnam': ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hue', 'Nha Trang', 'Can Tho', 'Hai Phong', 'Vinh', 'Bac Ninh', 'Long Xuyen'],
      'Yemen': ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Mukalla', 'Dhamar', 'Ibb', 'Al Hudaydah', 'Marib', 'Sayun']
    };
    // Event listener for region selection
    regionSelect.addEventListener('change', function() {
      const region = this.value;
      provinceStateSelect.innerHTML = '<option value="">Select Province/State</option>';
      cityTownSelect.innerHTML = '<option value="">Select City/Town</option>';
      provinceStateSelect.disabled = !region;
      cityTownSelect.disabled = true;
      if (region) {
        const provincesList = provinces[region];
        provincesList.forEach(province => {
          const option = document.createElement('option');
          option.value = province;
          option.textContent = province;
          provinceStateSelect.appendChild(option);
        });
      }
    });
    // Event listener for province/state selection
    provinceStateSelect.addEventListener('change', function() {
      const province = this.value;
      cityTownSelect.innerHTML = '<option value="">Select City/Town</option>';
      cityTownSelect.disabled = !province;
      if (province) {
        const citiesList = cities[province];
        citiesList.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          cityTownSelect.appendChild(option);
        });
      }
    });
  });
</script>


<style>
.container-location {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two-column layout */
    gap: 20px; /* Space between grid items */
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

select {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

select:disabled {
    background-color: #e9ecef;
}

/* Ensure that the select elements span across columns */
select.full-width {
    grid-column: span 2; /* Span across both columns */
}

</style>

---
## Explore Categories
### Local Community
- [Activities & Hobbies](#activities-hobbies)
- [Creative Talents](#creative-talents)
- [Childcare Services](#childcare-services)
- [Courses & Workshops](#courses-workshops)
- [Upcoming Events](#upcoming-events)
- [Miscellaneous](#miscellaneous)
- [Local Groups](#local-groups)
- [Neighborhood News](#neighborhood-news)
- [Lost & Found](#lost-found)
- [Missed Connections](#missed-connections)
- [Musicians & Bands](#musicians-bands)
- [Pet Care & Adoptions](#pet-care-adoptions)
- [Politics & Advocacy](#politics-advocacy)
- [Rants & Raves](#rants-raves)
- [Carpool & Rideshare](#carpool-rideshare)
- [Volunteer Opportunities](#volunteer-opportunities)
### Professional Services
- [Auto Services](#auto-services)
- [Beauty & Wellness](#beauty-wellness)
- [Mobile/Cell Repair](#mobile-cell-repair)
- [IT & Computer Help](#it-computer-help)
- [Creative Services](#creative-services)
- [Bike Repair & Sales](#bike-repair-sales)
- [Event Services](#event-services)
- [Farming & Gardening](#farming-gardening)
- [Financial Services](#financial-services)
- [Health & Fitness](#health-fitness)
- [Household Services](#household-services)
- [Moving & Labor Help](#moving-labor-help)
- [Legal Assistance](#legal-assistance)
- [Tutoring & Lessons](#tutoring-lessons)
- [Marine Services](#marine-services)
- [Pet Care Services](#pet-care-services)
- [Real Estate Services](#real-estate-services)
- [Skilled Trades](#skilled-trades)
- [Small Business Ads](#small-business-ads)
- [Travel & Vacation Planning](#travel-vacation-planning)
- [Writing, Editing & Translation](#writing-editing-translation)
### Discussion Boards
- [Apple & Tech Talk](#apple-tech-talk)
- [Arts & Creativity](#arts-creativity)
- [Atheism](#atheism)
- [Car Enthusiasts](#car-enthusiasts)
- [Beauty & Style](#beauty-style)
- [Bicycling](#bicycling)
- [Celebrity News](#celebrity-news)
- [Computer & Tech](#computer-tech)
- [Cosmic Discussion](#cosmic-discussion)
- [Health & Diet](#health-diet)
- [Divorce Support](#divorce-support)
- [End-of-Life Planning](#end-of-life-planning)
- [Environmental Issues](#environmental-issues)
- [Feedback & Suggestions](#feedback-suggestions)
- [Film & TV Discussion](#film-tv-discussion)
- [DIY & Repairs](#diy-repairs)
- [Food & Drink](#food-drink)
- [Frugal Living](#frugal-living)
- [Gaming & Esports](#gaming-esports)
- [Gardening](#gardening)
- [Creative Writing (Haiku)](#creative-writing-haiku)
- [General Help](#general-help)
- [History & Facts](#history-facts)
- [Housing & Real Estate](#housing-real-estate)
- [Job & Career Advice](#job-career-advice)
- [Humor & Jokes](#humor-jokes)
- [Legal Help](#legal-help)
- [Etiquette & Manners](#etiquette-manners)
- [Marriage & Relationships](#marriage-relationships)
- [Personal Finance](#personal-finance)
- [Music Discussion](#music-discussion)
- [Parenting Tips](#parenting-tips)
- [Pet Discussions](#pet-discussions)
- [Philosophy Talk](#philosophy-talk)
- [Photography](#photography)
- [Political Debates](#political-debates)
- [Mental Health & Psychology](#mental-health-psychology)
- [Addiction & Recovery](#addiction-recovery)
- [Religious Discussions](#religious-discussions)
- [Science & Technology](#science-technology)
- [Spirituality](#spirituality)
- [Sports Talk](#sports-talk)
- [Paranormal & Supernatural](#paranormal-supernatural)
- [Tax Advice](#tax-advice)
- [Travel Discussions](#travel-discussions)
- [TV Shows & Movies](#tv-shows-movies)
- [Vegan Living](#vegan-living)
- [Literature & Writing](#literature-writing)
### Housing & Rentals
- [Apartments & Housing](#apartments-housing)
- [Home Exchange](#home-exchange)
- [Housing Wanted](#housing-wanted)
- [Office & Commercial Space](#office-commercial-space)
- [Parking & Storage](#parking-storage)
- [Real Estate for Sale](#real-estate-for-sale)
- [Shared Rooms](#shared-rooms)
- [Roommates Wanted](#roommates-wanted)
- [Temporary/Sublets](#temporary-sublets)
- [Vacation Rentals](#vacation-rentals)
### For Sale
- [Antiques](#antiques-sale)
- [Home Appliances](#home-appliances-sale)
- [Arts & Crafts Supplies](#arts-crafts-supplies)
- [ATVs & Snowmobiles](#atvs-snowmobiles-sale)
- [Auto Parts](#auto-parts-sale)
- [Aircraft](#aircraft-sale)
- [Baby & Kids Items](#baby-kids-items-sale)
- [Barter & Trade](#barter-trade)
- [Beauty & Health Items](#beauty-health-items-sale)
- [Bike Parts](#bike-parts-sale)
- [Bicycles](#bicycles-sale)
- [Boat Parts](#boat-parts-sale)
- [Boats](#boats-sale)
- [Books & Literature](#books-literature-sale)
- [Business Equipment](#business-equipment-sale)
- [Cars & Trucks](#cars-trucks-sale)
- [Media (CDs/DVDs/VHS)](#media-cds-dvds-vhs-sale)
- [Cell Phones](#cell-phones-sale)
- [Clothing & Accessories](#clothing-accessories-sale)
- [Collectibles](#collectibles-sale)
- [Computer Parts](#computer-parts-sale)
- [Computers](#computers-sale)
- [Electronics](#electronics-sale)
- [Farm & Garden Supplies](#farm-garden-supplies-sale)
- [Free Items](#free-items)
- [Furniture](#furniture-sale)
- [Garage Sales](#garage-sales)
- [General Goods](#general-goods-sale)
- [Heavy Equipment](#heavy-equipment-sale)
- [Household Goods](#household-goods-sale)
- [Jewelry](#jewelry-sale)
- [Building Materials](#building-materials-sale)
- [Motorcycle Parts](#motorcycle-parts-sale)
- [Motorcycles](#motorcycles-sale)
- [Musical Instruments](#musical-instruments-sale)
- [Photo & Video Gear](#photo-video-gear-sale)
- [RVs & Campers](#rvs-campers-sale)
- [Sporting Equipment](#sporting-equipment-sale)
- [Tickets](#tickets-sale)
- [Tools & Hardware](#tools-hardware-sale)
- [Toys & Games](#toys-games-sale)
- [Utility Trailers](#utility-trailers-sale)
- [Video Gaming](#video-gaming-sale)
- [Wanted Items](#wanted-items)
- [Wheels & Tires](#wheels-tires-sale)
### Job Listings
- [Finance & Accounting](#finance-accounting-jobs)
- [Office & Admin](#office-admin-jobs)
- [Architecture & Engineering](#architecture-engineering-jobs)
- [Media & Design](#media-design-jobs)
- [Biotech & Science](#biotech-science-jobs)
- [Business & Management](#business-management-jobs)
- [Customer Support](#customer-support-jobs)
- [Education & Teaching](#education-teaching-jobs)
- [Food & Hospitality](#food-hospitality-jobs)
- [General Labor](#general-labor-jobs)
- [Government & Public Sector](#government-public-sector-jobs)
- [Human Resources](#human-resources-jobs)
- [Legal & Paralegal](#legal-paralegal-jobs)
- [Manufacturing Jobs](#manufacturing-jobs)
- [Marketing & PR](#marketing-pr-jobs)
- [Medical & Health Jobs](#medical-health-jobs)
- [Nonprofit Work](#nonprofit-work)
- [Real Estate Jobs](#real-estate-jobs)
- [Retail & Sales](#retail-sales-jobs)
- [Business Development](#business-development-jobs)
- [Salon & Spa Jobs](#salon-spa-jobs)
- [Security Work](#security-work)
- [Tech & IT Jobs](#tech-it-jobs)
- [Transportation Jobs](#transportation-jobs)
- [Writing & Editing Jobs](#writing-editing-jobs)
### Gigs & Short-Term Work
- [Creative & Writing Gigs](#creative-writing-gigs)
- [Computer & Tech Gigs](#computer-tech-gigs)
- [Events & Promotions](#events-promotions-gigs)
- [Household Help](#household-help-gigs)
- [Labor Gigs](#labor-gigs)
- [Local Community Gigs](#local-community-gigs)
- [Music & Performance](#music-performance-gigs)
- [Tutoring & Lessons](#tutoring-lessons-gigs)
- [Volunteering](#volunteering-gigs)
- [Other Gigs](#other-gigs)
### Resumes & Employment Resources
- [Resume Posting](#resume-posting)
- [Job Search Tips](#job-search-tips)
- [Career Coaching](#career-coaching)
- [Freelance Work](#freelance-work)
- [Internships](#internships)
- [Apprenticeships](#apprenticeships)
- [Other Employment Resources](#other-employment-resources)
- ### Miscellaneous Services
- [Delivery & Errands](#delivery-errands-services)
- [Event Planning](#event-planning-services)
- [Gift Wrapping & Personal Shopping](#gift-wrapping-personal-shopping-services)
- [Pet Sitting & Dog Walking](#pet-sitting-dog-walking-services)
- [Tailoring & Alterations](#tailoring-alterations-services)
- [Wedding Services](#wedding-services)
- [Other Services](#other-services)


<style>
/* Styling for the main container */
.container-location {
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 8px;
}

/* Style for the headings */
h1, h2, h3 {
    color: #34495e;
    text-align: center;
    margin-bottom: 15px;
}

h1 {
    font-size: 2.2rem;
    margin-top: 30px;
}

h2 {
    font-size: 1.8rem;
    margin-top: 25px;
}

h3 {
    font-size: 1.4rem;
    margin-top: 15px;
}

/* Category listing styling */
ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    margin: 12px 0;
    padding: 12px;
    background-color: #f9f9f9;
    border-left: 5px solid #3498db;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul li a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: normal;
    display: block;
    padding: 8px;
    border-radius: 4px;
}

ul li a:hover {
    color: #2980b9;
    background-color: #ecf0f1;
}

/* Category section styling */
.category-section {
    margin-bottom: 30px;
}

/* Button-like links for categories */
ul li a {
    transition: background-color 0.3s, color 0.3s;
}

/* Responsive design */
@media (max-width: 768px) {
    h1 {
        font-size: 1.8rem;
    }

    h2 {
        font-size: 1.6rem;
    }

    h3 {
        font-size: 1.2rem;
    }

    .container {
        padding: 20px;
    }
}
</style>
