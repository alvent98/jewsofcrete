/*
 *
 * JEWS OF CRETE
 *
 * Main JavaScript File
 *
 * v20240229a
 *
 *
 */

// This object contains the various parameters (On Dev)
var config = {
  pathOfMultimedia: "./rsc/multimedia/original/", // The path where the original multimedia files are available
  pathOfSmallImages: "./rsc/multimedia/small/", // The path where the images for the popups and the left panel are available
  pathOfThumbnailImages: "./rsc/multimedia/thumbnails/", // The path where the images for the thumbnails are available
  api_server: "",
  sliderMapOptions: {
    displayList: false,
    intervalDuration: 5000,
    transitionDuration: 2000,
    displayControls: false,
    adaptiveHeight: false,
  },
  mapOptions: {
    defaultZoomLevel: 14.2,
    defaultCenter: { lng: 24.024982, lat: 35.512782 },
    maxBounds: {
      sw: { lng: 23.98, lat: 35.47 },
      ne: { lng: 24.07, lat: 35.54 },
    },
  },
};

var currentPage; // Contains which page is current.

// -----------------    Functions & Variables     ------------------------
// Those of Maps need to be here in order to be used in the popups.

var mainMap; // The map element.

var layerHomes; // Holds the GeoJSON object of the Homes layer.

var layerMonuments1; // Holds the GeoJSON object of the Monuments of Period 1 layer.

var layerMonuments2; // Holds the GeoJSON object of the Monuments of Period 2 layer.

var clusterGroupHomes; //Holds the clusters of the markers.

var pgwSlider; // Holds the slider.

var language; // Holds the current language.

var languageSuffix; // Holds the suffix for the current language.

var browsersLanguage; // Holds the code for the primary language selected on user's browser.

var selectedPeriod = 0; // Holds the selected period for the map. 0= Late 19th Century-1944, 1= 1944-1999, 2= 1999-Today

var selectedMarkers = []; //Holds the markers which are selected.

var svgRelations; // Holds the svg for the Relations' canvas.

// Tooltips language specific text
var contentEras = [{
  "EL": "<p>Στη στροφή του 19ου προς τον 20ό αιώνα η εβραϊκή παρουσία στην Κρήτη είναι κυρίως εντοπισμένη στην πόλη των Χανίων. Πρόκειται για μια μικρή κοινότητα 500-600 ανθρώπων. Η άλλοτε ακμάζουσα κοινότητα του Ηρακλείου είχε συρρικνωθεί ήδη στα τέλη του 18ου αιώνα, ενώ για το Ρέθυμνο δεν έχουμε συστηματικές αναφορές• οι οικογένειες που έμεναν εκεί πρέπει να ήταν λίγες και η συναγωγή πιθανότατα ανενεργή. Στα Χανιά όμως, πρωτεύουσα της Κρήτης από τα μέσα του 19ου αιώνα, η εβραϊκή κοινότητα σημειώνει αξιοσημείωτη δραστηριότητα που μαρτυρά την επιθυμία της να εδραιωθεί περαιτέρω στην πόλη. Το 1874 συγκροτείται τοπική επιτροπή της Alliance Israélite Universelle (AIU), της διεθνούς εβραϊκής οργάνωσης που έδρευε στο Παρίσι και στόχευε στον «εκμοντερνισμό» των εβραϊκών πληθυσμών στη Βόρεια Αφρική και την Ανατολική Μεσόγειο. Πρωταρχικός στόχος της τοπικής επιτροπής της AIU στα Χανιά ήταν η ίδρυση σχολείου, κάτι που τελικά υλοποιήθηκε λίγα χρόνια αργότερα από την κοινότητα. Το 1876 αναλαμβάνει στα Χανιά καθήκοντα αρχιραβίνου Κρήτης ο Αβραάμ Ευλαγών, ένας άνθρωπος που ως τον θάνατό του το 1933 θα αποδειχτεί σημαντική φιγούρα του εβραϊσμού της Οθωμανικής Αυτοκρατορίας. Το 1879 ιδρύεται μία ένωση εβραϊκής νεολαίας στην πόλη, η Fraternité Israélite. Το 1880 αποφασίζεται να δοθούν χρήματα για την αναστήλωση μίας εκ των δύο συναγωγής της πόλης, της Μπεθ Σαλόμ — στη συναγωγή αυτή θα γίνει δεκτός με πανηγυρισμούς o βασιλιάς Κωνσταντίνος την ημέρα της ένωσης της Κρήτης με την Ελλάδα το 1913.</p><br><p>Οι δεκαετίες όμως που θα ακολουθήσουν ως το τέλος του Β΄Παγκοσμίου Πολέμου θα επιφέρουν σημαντικές ανακατατάξεις για όλους τους κατοίκους των Χανίων και της Κρήτης, εβραίους, χριστιανούς και μουσουλμάνους. Κατά την περίοδο αυτή, η πληθυσμιακή συγκρότηση της πόλης θα αλλάξει ριζικά. Οι πρώτες αλλαγές διαπιστώνονται στα χρόνια της Κρητικής Πολιτείας (1898-1913), όταν αρχίζει να καταγράφεται, ιδιαίτερα κατά τη δεκαετία του 1910, ένα κύμα μετανάστευσης προς τις ΗΠΑ και άλλου. Η μεγάλη τομή θα έρθει βέβαια με τη Συνθήκη της Λωζάνης το 1923 και την επιβολή της υποχρεωτικής και οριστικής αποχώρησης των μουσουλμάνων από το νησί. Επίσης, στο πεδίο της πολιτικής, η ένωση της Κρήτης με την Ελλάδα το 1913 θα έχει ως συνέπεια μια σειρά από ουσιαστικές μεταβολές: η θεσμική μετατροπή του νησιού της Κρήτης από αυτόνομο κράτος σε επαρχία του ελληνικού κράτους και η συνεπακόλουθη απομάκρυνση της κεντρικής πολιτικής εξουσίας θα καταστήσει σταδιακά την πόλη των Χανίων — πολιτικό και διοικητικό κέντρο της Κρήτης ως τότε — αλλά και ευρύτερα το νησί περιφερειακές, οικονομικά και κοινωνικά, δυνάμεις.</p><br><p>Στη διάρκεια όλης αυτής της εξαιρετικά πυκνής περιόδου μέχρι και την κατοχή της Κρήτης από τις δυνάμεις του Άξονα, ο εβραϊκός πληθυσμός των Χανίων μειώθηκε σημαντικά. Από τα περίπου 600 άτομα που καταγράφονται στις αρχές του 20ού αιώνα, το 1944 έχουν μείνει τα μισά. Ο μικρός αυτός εβραϊκός πληθυσμός συνεχίζει, όμως, να ζει στο κέντρο της πόλης και να αποτελεί οργανικό κομμάτι της, μέχρι τη σύλληψη και τον εκτοπισμό του από τον γερμανικό στρατό κατοχής στις 20 Μαΐου του 1944.</p><br><p>Στον παρόντα χάρτη βρίσκονται τοποθετημένοι με χωρικό στίγμα κατοικίας ή/και επαγγελματικής στέγης πολλοί από τους εβραίους των Χανίων που έζησαν στην πόλη από τα τέλη του 19ου αιώνα ως το 1944. Για όσους δεν εντοπίστηκε σχετική χωρική πληροφορία, έγινε ο συσχετισμός τους με τις οικογένειες στις οποίες ανήκουν και μπορούν να εντοπιστούν στις <a href='indexRelationsEL.html'>Οικογένειες</a>.</p>",
  "EN": "<p>At the turn of the 19th to the 20th century, the Jewish presence in Crete was primarily centered in the city of Hania. It was a small community of approximately 500-600 people. The once-thriving community of Heraklion had declined by late 18th century. For Rethymno there are no systematic references; the families living there must have been few, and the synagogue was probably inactive.</p><br><p>In Hania, however—the island’s capital of Crete since the mid-19th century—the Jewish community was remarkably active, manifesting its desire to further consolidate its position in the city. In 1874, a local branch of the Alliance Israélite Universelle (AIU) was founded there. Based in Paris, the AIU, sought to “modernize” Jewish populations across North Africa and the Eastern Mediterranean. The primary goal of the AIU local committee was to establish a school, a project that was ultimately realized by the community a few years later. In 1876, Abraham Evlagon arrived in Hania to serve as Chief Rabbi of Crete—a leading figure in Ottoman Jewry until his death in 1933. Three years later, in 1879, a Jewish youth association, the Fraternité Israélite, was founded in the city. In 1880, the community decided to fund the restoration of one of Hania’s two synagogues, Beth Shalom—the same synagogue that would later host King Constantine in a joyous ceremony marking Crete’s union with Greece in 1913.</p><br><p>However, the decades that followed the end of World War II brought major upheavals for all the inhabitants of Hania and Crete—Jews, Christians, and Muslims alike. During this time, the city’s demographic composition changed radically. The first sings of change appeared during the years of the Cretan State (1898–1913), when a wave of emigration began—particularly during the 1910s —to the United States and elsewhere. The most decisive turning point, however, came with the Treaty of Lausanne in 1923, which imposed the compulsory and permanent departure of the island’s Muslim population. In the political sphere, the union of Crete with Greece in 1913 brought a series of substantial transformations. The island’s shift from an autonomous state to a province of the Greek nation, and the consequent relocation of central political authority, gradually rendered the city of Hania—until then the political and administrative center of Crete—and, more broadly, the island itself, peripheral forces in both economic and social terms.</p><br><p>Throughout this dense period leading up to the Axis occupation of Crete, the Jewish population of Hania declined significantly. From around 600 people at the beginning of the 20th century, barely half remained by 1944. Despite their dwindling numbers, they  continued to live in the heart of the city and to form an integral part of its life—until their arrest and deportation by the German occupation forces on May 20, 1944.</p><br><p>This map shows the homes and/or workplaces of many of Hania’s Jewish residents who lived in the city from the late 19th century until 1944. For those whose exact locations are not known, they are connected to the families they belonged to and can be explored under <a href='indexRelationsEN.html'>Families</a>.</p>"
},
{
  "EL":"<p>Τα ξημερώματα της 20ής Μαΐου του 1944 οι εβραίοι των Χανίων –περίπου 250 άνδρες, γυναίκες και παιδιά– συλλαμβάνονται από τον γερμανικό στρατό κατοχής. ∆ύο εβδομάδες αργότερα μεταφέρονται στο Ηράκλειο, όπου φυλακίζονται μαζί με τους λίγους εβραίους που ζουν εκεί. Στις 8 Ιουνίου το βράδυ επιβιβάζονται, μαζί με Ιταλούς και Έλληνες χριστιανούς αιχμαλώτους, στο πλοίο Τάναϊς με προορισμό τον Πειραιά. Λίγες ώρες μετά την αναχώρησή του από το λιμάνι του Ηρακλείου, το πλοίο τορπιλίζεται από βρετανικό υποβρύχιο και βυθίζεται. Όλοι οι κρατούμενοι, εβραίοι και χριστιανοί, πνίγονται.</p><br><p>Η μεταπολεμική περίοδος βρίσκει, έτσι, την εβραϊκή παρουσία στην πόλη των Χανίων εντελώς αποδεκατισμένη. Η πρώην ζωντανή εβραϊκή κοινότητα των Χανίων μετατρέπεται, σύμφωνα με τον <a href='http://www.et.gr/idocs-nph/search/pdfViewerForm.html?args=5C7QrtC22wGeBMllC-RzYHdtvSoClrL86BYA0d1yFht5MXD0LzQTLWPU9yLzB8V68knBzLCmTXKaO6fpVZ6Lx9hLslJUqeiQunRDxFXRX_voH17tW8h0Vr3Yl-BM62AFxZ087KRd1po.' download='AN367-1945' target='_blank'>Α.Ν. 367/1945</a>, σε μια «εν αδρανεία κοινότητα». Ελάχιστοι επιζώντες ζουν στην πόλη μεταπολεμικά. Μεγάλο μέρος της ιδιωτικής περιουσίας τους σταδιακά αλλάζει χέρια. Μεγάλο μέρος της κοινοτικής περιουσίας καταπατάται ή πωλείται.</p>",
  "EN":"<p>In the early hours of May 20, 1944, the Jews of Hania—about 250 men, women, and children—were arrested by the German occupation forces. Two weeks later, they were taken to the city of Heraklion, where they were imprisoned together with the few Jews living there. On the evening of June 8, they were boarded onto the ship Tanais bound for Piraeus, along with Italian and Greek Christian prisoners,. A few hours after it departed from the port of Heraklion, the ship was torpedoed by a British submarine and sank. All the prisoners, Jews and Christians, drowned.</p><br><p>The post-war period thus found the Jewish presence in the city of Hania completely decimated. The once-vibrant Jewish community of Hania was now designated under Law <a href='http://www.et.gr/idocs-nph/search/pdfViewerForm.html?args=5C7QrtC22wGeBMllC-RzYHdtvSoClrL86BYA0d1yFht5MXD0LzQTLWPU9yLzB8V68knBzLCmTXKaO6fpVZ6Lx9hLslJUqeiQunRDxFXRX_voH17tW8h0Vr3Yl-BM62AFxZ087KRd1po.' download='AN367-1945' target='_blank'>Α.Ν. 367/1945</a> as an \"inactive community\". Only a few survivors continued to live in the city after the war. Much of their private property gradually changes hands, while a large part of the communal property was seized or sold.</p>"
},
{
  "EL":"<p>Η αναστήλωση της Συναγωγής Ετζ Χαγίμ από τον Νικόλα Σταυρουλάκη το 1999 σηματοδοτεί την αρχή μιας περιόδου ανάδυσης της ιστορίας των εβραίων στα Χανιά. Η ανάδειξη του υλικού αποτυπώματος μιας πληθυσμιακής ομάδας που είχε ξεχαστεί ολοκληρωτικά μεταπολεμικά ήταν μία πρώιμη έκφραση της γενικότερης στροφής που επρόκειτο να συντελεστεί τα επόμενα χρόνια στη δημόσια εικόνα της πόλης των Χανίων. Η στροφή αυτή αφορούσε την — έστω περιορισμένη σε αριθμό και επιλεκτική — αναστήλωση και συντήρηση μνημείων εκείνων των πληθυσμιακών ομάδων που χάθηκαν από την πόλη στη διάρκεια των βίαιων ανακατατάξεων του 20ού αιώνα. Η αναστήλωση, παραδείγματος χάριν, του μιναρέ του Χουνκιάρ Τζαμί (νυν εκκλησία του Αγίου Νικολάου) στην πλατεία της Σπλάντζιας εγγράφεται σε αυτή την προσπάθεια τοπικών φορέων και μέρους του τοπικού πληθυσμού να αναγνωρίσουν και να αναδείξουν το πολυπολιτισμικό παρελθόν της πόλης.</p><br><p>Η μνήμη των εβραίων της Κρήτης επιτελείται σήμερα στα δύο μνημεία που σχετίζονται με την ιστορία της εβραϊκής κοινότητας των Χανίων: στη Συναγωγή Ετζ Χαγίμ, και στο Μνημείο Θυμάτων Τάναϊς που κατασκευάστηκε το 2013 από τον γλύπτη Μίλτο Παπαστεργίου και είναι αφιερωμένο στους εβραίους της Κρήτης αλλά και στους χριστιανούς Έλληνες και Ιταλούς αιχμαλώτους που χάθηκαν στη βύθιση του ατμόπλοιου Τάναϊς στις 9 Ιουνίου  του 1944.</p>",
  "EN":"<p>The restoration of the Etz Hayyim Synagogue by Nikolas Stavroulakis in 1999 marked the beginning of a new era, one in which the history of the Jews of Hania began to resurface. Reviving the material traces of a community erased from public memory after World War II was an early expression of a broader transformation in how the city viewed its own past. Over the following years, Hania slowly turned toward acknowledging its multicultural heritage, through the—albeit limited and selective—restoration and preservation of monuments linked to population groups who had disappeared from the city during the violent upheavals of the 20th century. The restoration of the minaret of the Hünkar Mosque (now the Church of Ayios Nikolaos) in Splantzia Square is part of this effort by local institutions and segments of the local population to acknowledge and highlight the city’s plural history.</p><br><p>Today, the memory of the Jews of Crete is kept alive and honored at two monuments linked to the Jews of Hania: the Etz Hayyim Synagogue; and the Tanais Victims Memorial. Created in 2013 by sculptor Miltos Papastergiou, the Memorial honors both the Jews of Crete and the Greek and Italian Christian prisoners who perished in the sinking of the steamship <i>Tanais</i> on June 9, 1944.</p>"
}];

var warningMessageEras = [{
  "EL": "Οι διευθύνσεις αντιστοιχούν στη δεκαετία του 1940 και όχι στο σήμερα.", 
  "EN": "The addresses are from the 1940s, not today."
},
{
  "EL": "Για τη μεταπολεμική περίοδο το χωρικό στίγμα είναι ενδεικτικό.", 
  "EN": "The spatial stigma is indicative of the post-war period."
},
{
  "EL": "Για τη μεταπολεμική περίοδο το χωρικό στίγμα είναι ενδεικτικό.", 
  "EN": "The spatial stigma is indicative of the post-war period."
}];

// Holds data about the monuments (cemetery, synagogue).
var monuments = {
  type: "FeatureCollection",
  name: "monuments",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:OGC:1.3:CRS84",
    },
  },
  features: [
    {
      type: "Feature",
      properties: {
        id: "synagogue",
        multimedia: [],
      },
      geometry: {
        type: "Point",
        coordinates: [24.016685, 35.515775],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "cemetery",
        multimedia: [],
      },
      geometry: {
        type: "Point",
        coordinates: [24.01064, 35.515932],
      },
    },
  ],
};

// Holds the URL of the current page, invluding its parameters. Parameters' names are case sensitive.
const urlParams = new URLSearchParams(location.search);

var multiLanguageStrings = {
  id001: {
    el: "ΠΑΡΟΥΣΙΑΣΤΗΚΕ ΚΑΠΟΙΟ ΣΦΑΛΜΑ!",
    en: "AN ERROR OCCURED!",
  },

  id002: {
    el: "ΠΛΗΡΟΦΟΡΙΕΣ ΓΙΑ ΤΟΝ ΟΙΚΟ:",
    en: "DATA ABOUT THE HOUSEHOLD:",
  },
  id003: {
    el: "Όνομα:",
    en: "Name:",
  },
  id004: {
    el: "Μέλη τού Οίκου:",
    en: "Members of the Household:",
  },
  id005: {
    el: "<Χωρίς Όνομα>",
    en: "<Without Firstname>",
  },
  id006: {
    el: "<Χώρις Επίθετο>",
    en: "<Without Lastname>",
  },
  id007: {
    el: "Η Εικόνα Λείπει!",
    en: "Image is missing!",
  },
  id008: {
    el: "Η Εβραϊκή Περιοχή στα Χανιά",
    en: "The Jewish Area of Chania",
  },
  id009: {
    el: "Δεν βρέθηκαν στοιχεία.",
    en: "No Data Found.",
  },
  id010: {
    el: "ΠΡΟΣΩΠΙΚΕΣ ΠΛΗΡΟΦΟΡΙΕΣ:",
    en: "PERSONAL DATA:",
  },
  id011: {
    el: "Οίκοι:",
    en: "Households:",
  },
  id012: {
    el: "Ονοματεπώνυμο:",
    en: "Full Name:",
  },
  id013: {
    el: "Απασχόληση:",
    en: "Occupation:",
  },
  id014: {
    el: "Γεννήθηκε:",
    en: "Born:",
  },
  id015: {
    el: "Απεβίωσε:",
    en: "Died:",
  },
  id016: {
    el: "Παρατηρήσεις:",
    en: "Remarks:",
  },
  id017: {
    el: "Επιλέξτε ένα από τα ακόλουθα πρόσωπα με το Επίθετο: ",
    en: "Select one of the following persons with Lastname: ",
  },
  id018: {
    el: "Σύζυγοι",
    en: "Spouses",
  },
  id019: {
    el: "Αδέλφια",
    en: "Siblings",
  },
  id020: {
    el: "Γονέας-Παιδί",
    en: "Parent-Child",
  },
  id021: {
    el: "Άγνωστη Σχέση",
    en: "Unknown Relashionship",
  },
  id022: {
    el: "Γονείς:",
    en: "Parents:",
  },
  id023: {
    el: "Αδέρφια:",
    en: "Siblings:",
  },
  id024: {
    el: "Παιδιά:",
    en: "Children:",
  },
  id025: {
    el: "Σύζυγοι:",
    en: "Spouses:",
  },
  id026: {
    el: "Ο ΙΣΤΟΤΟΠΟΣ ΕΙΝΑΙ ΥΠΟ ΚΑΤΑΣΚΕΥΗ !",
    en: "THIS WEBSITE IS CURRENTLY UNDER DEVELOPMENT",
  },
  id027: { el: "Υπηκοότητα", en: "Citizenship" },
  id028: { el: "Διεύθυνση", en: "Address" },
};

var currentMarkers=[];

function accordingToLanguage(id) {
  switch (language) {
    case "el":
      var stringToReturn = multiLanguageStrings[id].el;
      break;
    case "en":
      var stringToReturn = multiLanguageStrings[id].en;
      break;
  }
  return stringToReturn;
}

function changeVisibilityAccordingToPeriod(period) {
  let container = $("#uiMapLPDPPersonsList");

  // Hide scrollbar during transition
  container.css("overflow-y", "hidden"); // Hide the scroll bar if exists

  // Hide all elements that don't have the specific class
  $(".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData")
    .not(".period" + period)
    .fadeOut({
      duration: 1000,
      queue: false,
    });

  // Hide all uiMapLPPDPersonItem elements that don't have the specific class
  $(".uiMapLPPDPersonItem")
    .not(".period" + period)
    .fadeOut({
      duration: 2000,
      queue: false,
    });

  // Fade in elements with class uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonItem and periodX with duration 2000
  $(".uiMapLPPDPersonItem.period" + period).fadeIn({
    duration: 2000,
    queue: false,
  });

  // Fade in elements with class uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData and periodX with duration 1000
  $(
    ".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData.period" + period
  ).fadeIn({
    duration: 1000,
    queue: false,
  });

  container.css("overflow-y", "auto"); // Display again the scroll bar if needed
}

// Select Period 1, 2, or 3
function selectPeriod(period) {
      $("#uiMapInfoContainer").tooltip({
        content: warningMessageEras[period-1][languageSuffix]
      });
  changeVisibilityAccordingToPeriod(period);
}

// Returns a string value about the type of a multimedia reference
function getTypeOfMultimedia(item) {
  var typeOfMultimedia;
  function endswith(suffix) {
    return item.trim().toLowerCase().endsWith(suffix);
  }
  switch (true) {
    case endswith(".jpg"):
      typeOfMultimedia = "image";
      break;
    case endswith(".png"):
      typeOfMultimedia = "image";
      break;
    case endswith(".jpeg"):
      typeOfMultimedia = "image";
      break;
    case endswith(".mp3"):
      typeOfMultimedia = "audio";
      break;
    case endswith(".mp4"):
      typeOfMultimedia = "video";
      break;
    case endswith(".wmv"):
      typeOfMultimedia = "video";
      break;
    default:
      typeOfMultimedia = "unknown";
  }

  return typeOfMultimedia;
}

function clearLeftPanelListSelections() {
  $(".uiMapLPDataPanel").empty();
  $(".uiMapLPDataPanel").css("display", "none");
  $("#uiMapLPSelectLastName")[0].selectedIndex = 0;
}

// This function combines multiple first or last names.
function combinedName(namesArray) {
  var response = "";
  $.each(namesArray, function (index, item) {
    if (index > 0) {
      response += " - ";
    }
    response += item;
  });
  return response;
}

// This function handles the multimedia page.
function manageMultimediaPage() {
  var $uiGallery = $("#uiGallery");
  
  $uiGallery.empty();

  $.getJSON(config.api_server + "/getMultimedia"+languageSuffix+".json", {
    language: languageSuffix,
  })

    .fail(function (err) {
      $uiGallery.append(
        $("<div>", {
          id: "uiGalleryError",
          text: accordingToLanguage("id001"), // id001 ΠΑΡΟΥΣΙΑΣΤΗΚΕ ΚΑΠΟΙΟ ΣΦΑΛΜΑ!
        })
      );
    })
    .done(function (data) {
      $.each(data.features, function (index, item) {
        if (!item.thumbnail) {
          item.thumbnail = "dwennimmen.jpg";
        }

        // This is needed because if gallery_theme is set to tiles, the alt attribute is required.
        if (!item.caption) {
          item.caption = "";
        }

        var typeOfMultimedia = getTypeOfMultimedia(item.filename);

        var caption = item.caption;

        switch (typeOfMultimedia) {
          case "video":
            $uiGallery.append(
              $("<img>", {
                alt: caption,
                src: config.pathOfThumbnailImages + item.thumbnail,
                "data-description": item.copyright,
                "data-type": "html5video",
                "data-videomp4": config.pathOfMultimedia + item.filename,
                style: "display:none",
              })
            );
            break;
          default:
            $uiGallery.append(
              $("<img>", {
                alt: caption,
                src: config.pathOfThumbnailImages + item.thumbnail,
                "data-image": config.pathOfMultimedia + item.filename,
                "data-description": item.copyright,
                "data-type": "image",

                style: "display:none",
              })
            );
        }
      });

      $uiGallery.unitegallery({
        //theme options:

        theme_enable_preloader: true, //enable preloader circle
        theme_preloading_height: 200, //the height of the preloading div, it show before the gallery
        theme_preloader_vertpos: 100, //the vertical position of the preloader
        theme_gallery_padding: 0, //the horizontal padding of the gallery from the sides
        theme_auto_open: null, //auto open lightbox at start - if some number gived, like   0

        //gallery options:

        gallery_theme: "tiles", //choose gallery theme (if more then one themes includes)
        gallery_width: "100%", //gallery width
        gallery_min_width: 150, //gallery minimal width when resizing
        gallery_background_color: "", //set custom background color. If not set it will be taken from css.

        //tiles options:

        tiles_type: "nested", //must option for the tiles - justified type
        tiles_enable_transition: true, //enable transition when screen width change
        tiles_space_between_cols: 20, //space between images
        tiles_space_between_cols_mobile: 10, //space between cols for mobile type
        tiles_nested_optimal_tile_width: 300, // tiles optimal width
        tiles_min_columns: 1, //min columns - for mobile size, for 1 column, type 1

        //tile design options:

        tile_enable_border: false, //enable border of the tile
        tile_border_width: 3, //tile border width
        tile_border_color: "#F0F0F0", //tile border color
        tile_border_radius: 0, //tile border radius (applied to border only, not to outline)

        tile_enable_outline: false, //enable outline of the tile (works only together with the border)
        tile_outline_color: "#8B8B8B", //tile outline color

        tile_enable_shadow: true, //enable shadow of the tile
        tile_shadow_h: 1, //position of horizontal shadow
        tile_shadow_v: 1, //position of vertical shadow
        tile_shadow_blur: 3, //shadow blur
        tile_shadow_spread: 2, //shadow spread
        tile_shadow_color: "#8B8B8B", //shadow color

        tile_enable_action: true, //enable tile action on click like lightbox
        tile_as_link: false, //act the tile as link, no lightbox will appear
        tile_link_newpage: true, //open the tile link in new page

        tile_enable_overlay: true, //enable tile color overlay (on mouseover)
        tile_overlay_opacity: 0.4, //tile overlay opacity
        tile_overlay_color: "#000000", //tile overlay color

        tile_enable_icons: true, //enable icons in mouseover mode
        tile_show_link_icon: false, //show link icon (if the tile has a link). In case of tile_as_link this option not enabled
        tile_space_between_icons: 26, //initial space between icons, (on small tiles it may change)

        tile_enable_image_effect: false, //enable tile image effect
        tile_image_effect_type: "blur", //bw, blur, sepia - tile effect type
        tile_image_effect_reverse: false, //reverce the image, set only on mouseover state

        //tile text panel options:

        tile_enable_textpanel: true, //enable textpanel
        tile_textpanel_source: "title", //title,desc,desc_title. source of the textpanel. desc_title - if description empty, put title
        tile_textpanel_always_on: false, //textpanel always visible
        tile_textpanel_appear_type: "slide", //slide, fade - appear type of the textpanel on mouseover
        tile_textpanel_position: "inside_bottom", //inside_bottom, inside_top, inside_center, top, bottom the position of the textpanel
        tile_textpanel_offset: 0, //vertical offset of the textpanel

        tile_textpanel_padding_top: 8, //textpanel padding top
        tile_textpanel_padding_bottom: 8, //textpanel padding bottom
        tile_textpanel_padding_right: 11, //cut some space for text from right
        tile_textpanel_padding_left: 11, //cut some space for text from left
        tile_textpanel_bg_opacity: 0.5, //textpanel background opacity
        tile_textpanel_bg_color: "#fa7a7a", //textpanel background color
        tile_textpanel_bg_css: {}, //textpanel background css

        tile_textpanel_title_color: "#eeeeee", //textpanel title color. if null - take from css
        tile_textpanel_title_font_family: "LinLibertine_DR", //textpanel title font family. if null - take from css
        tile_textpanel_title_text_align: null, //textpanel title text align. if null - take from css
        tile_textpanel_title_font_size: 13, //textpanel title font size. if null - take from css
        tile_textpanel_title_bold: false, //textpanel title bold. if null - take from css
        tile_textpanel_css_title: {}, //textpanel additional css of the title

        tile_textpanel_desc_color: "#dddddd", //textpanel description font family. if null - take from css
        tile_textpanel_desc_font_family: "LinLibertine_DR", //textpanel description font family. if null - take from css
        tile_textpanel_desc_text_align: null, //textpanel description text align. if null - take from css
        tile_textpanel_desc_font_size: 11, //textpanel description font size. if null - take from css
        tile_textpanel_desc_bold: false, //textpanel description bold. if null - take from css
        tile_textpanel_css_description: {}, //textpanel additional css of the description

        //lightbox options:

        lightbox_type: "wide", //compact / wide - lightbox type

        lightbox_hide_arrows_onvideoplay: true, //hide the arrows when video start playing and show when stop
        lightbox_arrows_position: "sides", //sides, inside: position of the arrows, used on compact type
        lightbox_arrows_offset: 10, //The horizontal offset of the arrows
        lightbox_arrows_inside_offset: 10, //The offset from the image border if the arrows placed inside
        lightbox_arrows_inside_alwayson: false, //Show the arrows on mouseover, or always on.

        lightbox_overlay_color: null, //the color of the overlay. if null - will take from css
        lightbox_overlay_opacity: 1, //the opacity of the overlay. for compact type - 0.6
        lightbox_top_panel_opacity: null, //the opacity of the top panel

        lightbox_close_on_emptyspace: true, //close the lightbox on empty space

        lightbox_show_numbers: true, //show numbers on the right side
        lightbox_numbers_size: null, //the size of the numbers string
        lightbox_numbers_color: null, //the color of the numbers
        lightbox_numbers_padding_top: null, //the top padding of the numbers (used in compact mode)
        lightbox_numbers_padding_right: null, //the right padding of the numbers (used in compact mode)

        lightbox_slider_image_border: true, //enable border around the image (for compact type only)
        lightbox_slider_image_border_width: 10, //image border width
        lightbox_slider_image_border_color: "#ffffff", //image border color
        lightbox_slider_image_border_radius: 0, //image border radius

        lightbox_slider_image_shadow: true, //enable border shadow the image

        lightbox_slider_control_swipe: true, //true,false - enable swiping control
        lightbox_slider_control_zoom: true, //true, false - enable zooming control

        //lightbox text panel:

        lightbox_show_textpanel: true, //show the text panel
        lightbox_textpanel_width: 550, //the width of the text panel. wide type only

        lightbox_textpanel_enable_title: true, //enable the title text
        lightbox_textpanel_enable_description: true, //enable the description text

        lightbox_textpanel_padding_top: 5, //textpanel padding top
        lightbox_textpanel_padding_bottom: 5, //textpanel padding bottom
        lightbox_textpanel_padding_right: 11, //cut some space for text from right
        lightbox_textpanel_padding_left: 11, //cut some space for text from left

        lightbox_textpanel_title_color: "#eeeeee", //textpanel title color. if null - take from css
        lightbox_textpanel_title_font_family: "LinLibertine_DR", //textpanel title font family. if null - take from css
        lightbox_textpanel_title_text_align: null, //textpanel title text align. if null - take from css
        lightbox_textpanel_title_font_size: 17, //textpanel title font size. if null - take from css
        lightbox_textpanel_title_bold: true, //textpanel title bold. if null - take from css
        lightbox_textpanel_css_title: {}, //textpanel additional css of the title

        lightbox_textpanel_desc_color: "#cccccc", //textpanel description font family. if null - take from css
        lightbox_textpanel_desc_font_family: "LinLibertine_DR", //textpanel description font family. if null - take from css
        lightbox_textpanel_desc_text_align: null, //textpanel description text align. if null - take from css
        lightbox_textpanel_desc_font_size: 12, //textpanel description font size. if null - take from css
        lightbox_textpanel_desc_bold: false, //textpanel description bold. if null - take from css
        lightbox_textpanel_css_description: {}, //textpanel additional css of the description
      });
    });
}

//
// Extends JQuery-ui Tooltip's functionality with hoverTimeout and tooltipHover options.
//
(function ($) {
  var uiTooltipTmp = {
    options: {
      hoverTimeout: 200,
      tooltipHover: false, // to have a regular behaviour by default. Use true to keep the tooltip while hovering it
    },
    // This function will check every "hoverTimeout" if the original object or it's tooltip is hovered. If not, it will continue the standard tooltip closure procedure.
    timeoutHover: function (event, target, tooltipData, obj) {
      var TO;
      var hov = false,
        hov2 = false;
      if (target !== undefined) {
        if (target.is(":hover")) {
          hov = true;
        }
      }
      if (tooltipData !== undefined) {
        if ($(tooltipData.tooltip).is(":hover")) {
          hov = true;
        }
      }
      if (target !== undefined || tooltipData !== undefined) {
        hov2 = true;
      }
      if (hov) {
        TO = setTimeout(
          obj.timeoutHover,
          obj.options.hoverTimeout,
          event,
          target,
          tooltipData,
          obj
        );
      } else {
        target.data("hoverFinished", 1);
        clearTimeout(TO);
        if (hov2) {
          obj.closing = false;
          obj.close(event, true);
        }
      }
    },
    // Changed standard procedure
    close: function (event) {
      var tooltip,
        that = this,
        target = $(event ? event.currentTarget : this.element),
        tooltipData = this._find(target);
      if (
        that.options.tooltipHover &&
        (target.data("hoverFinished") === undefined ||
          target.data("hoverFinished") === 0)
      ) {
        target.data("hoverFinished", 0);
        setTimeout(
          that.timeoutHover,
          that.options.hoverTimeout,
          event,
          target,
          tooltipData,
          that
        );
      } else {
        if (that.options.tooltipHover) {
          target.data("hoverFinished", 0);
        }

        // The rest part of standard code is unchanged

        if (!tooltipData) {
          target.removeData("ui-tooltip-open");
          return;
        }

        tooltip = tooltipData.tooltip;
        if (tooltipData.closing) {
          return;
        }

        clearInterval(this.delayedShow);

        if (target.data("ui-tooltip-title") && !target.attr("title")) {
          target.attr("title", target.data("ui-tooltip-title"));
        }

        this._removeDescribedBy(target);

        tooltipData.hiding = true;
        tooltip.stop(true);
        this._hide(tooltip, this.options.hide, function () {
          that._removeTooltip($(this));
        });

        target.removeData("ui-tooltip-open");
        this._off(target, "mouseleave focusout keyup");

        if (target[0] !== this.element[0]) {
          this._off(target, "remove");
        }
        this._off(this.document, "mousemove");

        if (event && event.type === "mouseleave") {
          $.each(this.parents, function (id, parent) {
            $(parent.element).attr("title", parent.title);
            delete that.parents[id];
          });
        }

        tooltipData.closing = true;
        this._trigger("close", event, { tooltip: tooltip });
        if (!tooltipData.hiding) {
          tooltipData.closing = false;
        }
      }
    },
  };

  // Extending ui.tooltip. Changing "close" function and adding two new parameters.
  $.widget("ui.tooltip", $.ui.tooltip, uiTooltipTmp);
})(jQuery);

// This function fetches buildings by selected period
function printBuildingsperPeriod(period, map) {
  if (currentMarkers!==null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
  }

  $.getJSON(config.api_server + "../getBuildings_new_"+period+".json", {})

  .fail(function (err) {
    $("#uiMapLPDPSelectPersonPanel").append(
      $("<div>", {
        id: "uiMapLPDPSelectPersonPanelError",
        text: accordingToLanguage("id001"), // id001 ΠΑΡΟΥΣΙΑΣΤΗΚΕ ΚΑΠΟΙΟ ΣΦΑΛΜΑ!
      })
    );
  })
  .done(function (data) {
    $.each(data.features, function (index, item) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";
      el.id = item.properties['id'];

      if (item.properties['persons'+languageSuffix] == undefined) {
          htmlToAdd = `<h3>${item.properties['address'+languageSuffix]}</h3>`
      } else {
        htmlToAdd = `<h3>${item.properties['address'+languageSuffix]}:</h3>
              <h4>${item.properties['persons'+languageSuffix]}</h4>`  
      }

      // make a marker for each feature and add to the map
      marker = new mapboxgl.Marker(el)
        .setLngLat(item.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 50 }) // add popups
            .setHTML(htmlToAdd)
        )
        .addTo(map);

        currentMarkers.push(marker);
    });
  });

  const observer = new MutationObserver((mutationsList, observer) => {
    const popupContent = document.querySelector('.mapboxgl-popup-content');
    if (popupContent) {
        // Change style based on condition
        if  (sessionStorage.getItem('selected_period') == 3) {
            console.log("selected_period = 3");
            popupContent.style.width = "300%";
        } 

        popupContent.scrollTop = 0; // reset to top
        // observer.disconnect(); // Stop observing after the first change

    }
  });
  
  // Observe the whole document body for added nodes
  observer.observe(document.body, { childList: true, subtree: true });
}

///////  T H E   M A I N   F U N C T I O N   ///////

$(function () {

  currentPage = $('meta[name="jocCurrentPage"]').attr("content");
  language = $('meta[name="jocLanguage"]').attr("content");
  browsersLanguage = window.navigator.language;

  // Check if language has been selected
  var languageSelected = new RegExp("[?&]languageSelected=([^&#]*)").exec(
    window.location.href
  );
  if (languageSelected) {
    languageSelected = languageSelected[1];
  } else {
    languageSelected = false;
  }

  if (language === "en") {
    languageSuffix = "EN";
    //  alert("THIS SITE IS CURRENTLY UNDER CONSTRUCTION !");
  } else {
    languageSuffix = "EL";
    //  alert("Ο ΙΣΤΟΤΟΠΟΣ ΕΙΝΑΙ ΥΠΟ ΚΑΤΑΣΚΕΥΗ !");
  }

  // console.log("mtDebug | Current Page is '" + currentPage + "'");
  // Loads the Menu Section

  $("#uiNavigatorOuter").load(
    "indexMenu" + languageSuffix + ".html",
    function () {
      // Moves the bottom line of the menu

      if (currentPage !== "indexSite") {
        // Firstly, the bottom line is set to the current selection

        $("#uiMenuItem-" + currentPage).addClass("uiMenuItemSelected");

        setTimeout(function () {
          $("#uiMenuBottomLine").animate(
            {
              width: $(".uiMenuItemSelected").css("width"),
              left:
                $(".uiMenuItemSelected").position().left -
                $("#uiMenuContainer").position().left,
            },
            10
          );
        }, 2000);
      }
      // A hoover event listener for the menu items
      $(".uiMenuItem").hover(function () {
        $("#uiMenuBottomLine").stop();

        $("#uiMenuBottomLine").animate(
          {
            width: $(this).css("width"),
            left:
              $(this).position().left - $("#uiMenuContainer").position().left,
          },
          500
        );
      });

      // A hoover event listener for the whole menu
      // Returns the bottom line to the selected item
      $("#uiMenu").hover(
        function () {},
        function () {
          $(".uiMenuItem").stop();
          $("#uiMenuBottomLine").stop();
          if (currentPage !== "indexSite") {
            $("#uiMenuBottomLine").animate(
              {
                width: $(".uiMenuItemSelected").css("width"),
                left:
                  $(".uiMenuItemSelected").position().left -
                  $("#uiMenuContainer").position().left,
              },
              500
            );
          } else {
            $("#uiMenuBottomLine").animate({ width: 0, left: 0 }, 500);
          }
        }
      );
    }
  );

  // Loads the Footer Section

  $("#uiFooterOuter").load(
    "indexFooter" + languageSuffix + ".html",
    function () {
      // Adds a suffix to all relevant links, in case the user wants Edit Mode enabled.
      // The code is in this callback, as the links need some time to be loaded.
      // The time needed by the user, in order to click the alert button, is utilized.

      if (currentPage === "indexMultimedia") {
        manageMultimediaPage();
      }
    }
  );

  if (
    currentPage === "index" ||
    currentPage === "indexResearch" ||
    currentPage === "indexContact" ||
    currentPage === "indexMultimedia" ||
    currentPage === "indexSite"
  ) {
    sessionStorage.setItem('selected_period', '1');
    if (sessionStorage.getItem('post_war_warning_already_displayed') == null) {
      sessionStorage.setItem('post_war_warning_already_displayed', "false")
    }
    if (sessionStorage.getItem('pre_war_warning_already_displayed') == null) {
      sessionStorage.setItem('pre_war_warning_already_displayed', "false")
    }

    // Manages the Go-To-The-Top button
    $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > $(window).height() - 120) {
        $("#uiGoToTheTop").fadeIn();
      } else {
        $("#uiGoToTheTop").fadeOut();
      }
    });
    $("#uiGoToTheTop").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
    if (currentPage === "index") {
      // Manages the multimedia slider
      $("#uiMultimediaRelationsItemSliderPGW").pgwSlider({
        displayList: false,
        height: 200,
        intervalDuration: 8000,
        transitionDuration: 1200,
      });

      // Manages the map history Era tooltips
      for (let era = 1; era <= 3; era++) {
        $("#uiMapsHistoryEra"+era+"Description").tooltip({
          classes: { "ui-tooltip": "jqui-tooltip" },
          content: contentEras[era-1][languageSuffix],
          items: "div",
          position: { my: "center top", at: "center top", collision: "flipfit" },
          hide: { effect: "fade", duration: 500 },
          show: { effect: "fade", duration: 500 },
          track: false,
          hoverTimeout: 250,
          tooltipHover: true,
        });

        $("#uiMapsHistoryEra"+era).click(function (){
          sessionStorage.setItem('selected_period', era.toString())
        })
      }      
    }
  }
  // End of what happens when the current page is INDEX or RESEARCH or CONTACT or MULTIMEDIA or SITE

  // These happen when the page is MAP

  // Manages the Map --------------------------------------------------------------------------

  if (currentPage === "indexMap") {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibXR6aW90aXNudHVhIiwiYSI6IkpDSmJWZE0ifQ.Z0pg5e-1e5DLN-4nJKgm8A";
    var map = new mapboxgl.Map({
      container: "mainMap", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      // style: "mapbox://styles/mtziotisntua/ckbwexpyk11wv1imlffe8o5nu", // style URL
      // style: "mapbox://styles/mapbox/standard-satellite", // style URL      
      // style: "mapbox://styles/mapbox/streets-v12", // style URL
      style: "mapbox://styles/mapbox/outdoors-v12", // style URL
 
      center: config.mapOptions.defaultCenter, // starting position [lng, lat]
      zoom: config.mapOptions.defaultZoomLevel, // starting zoom
      maxBounds: [
        config.mapOptions.maxBounds.sw,
        config.mapOptions.maxBounds.ne,
      ],
    });

    // Manages the Left Panel

    // This function is needed in order to not have the left panel items overflow
    function manageLeftPanel() {
      $("#uiMapLeftPanel").css("max-height", $("#uiMainMapContainer").height());
    }

    $(window).on("resize", manageLeftPanel());

    manageLeftPanel();

    // Manages the multimedia slider
    pgwSlider = $("#uiMultimediaItemSliderPGW").pgwSlider(
      config.sliderMapOptions
    );

    function getLanguageFromFilename() {
      const filename = window.location.pathname.split("/").pop(); // e.g. "indexMapEL.html"
      const match = filename.match(/([A-Z]{2})(?=\.html$)/i);     // capture last 2 letters before ".html"
      return match ? match[1] : "EN";              // fallback to "EN" if not found
    }
    
    let languageSuffix = getLanguageFromFilename();

    // Expected tooltip behavior (on hover etc)
    $("#uiMapInfoContainer").tooltip({
      classes: { "ui-tooltip": "jqui-tooltip" },
      content: function() {
        const periodIndex = sessionStorage.getItem("selected_period") - 1;
        if (periodIndex == undefined) {
            periodIndex = 0;
        }
        return warningMessageEras[periodIndex][languageSuffix];
      },
      items: "div",
      position: { my: "center", at: "center", collision: "flipfit" },
      hide: { effect: "fade", duration: 500 },
      show: { effect: "fade", duration: 500 },
      track: false,
      hoverTimeout: 250,
      tooltipHover: true,
    });
    
    if (sessionStorage.getItem('pre_war_warning_already_displayed') == "false" 
        && sessionStorage.getItem('post_war_warning_already_displayed') == "false"
        && sessionStorage.getItem('selected_period') != 3) {
      $(document).on('load', togglePopup());
    }

    function togglePopup() {
        $(".content").show();
        $("#popup").html(warningMessageEras[sessionStorage.getItem("selected_period")-1][languageSuffix]);
    }

    $(".close-btn").on("click", function(){
      $(".content").hide();
    });

    $("#uiMapPeriodSelectorPeriod1").on("click", function(){
       if (sessionStorage.getItem('pre_war_warning_already_displayed') == "false") {
        $("#popup").html(warningMessageEras[0][languageSuffix]);
        $(".content").show();
      }
      sessionStorage.setItem('pre_war_warning_already_displayed', "true")
    });

    $("#uiMapPeriodSelectorPeriod2").on("click", function(){
      if (sessionStorage.getItem('post_war_warning_already_displayed') == "false") {
        $("#popup").html(warningMessageEras[1][languageSuffix]);
        $(".content").show();      }
      sessionStorage.setItem('post_war_warning_already_displayed', "true")
    });

    // Add event listener for the period selector.
    $("#uiMapPeriodSelectorContainer")
      .children(".mapPeriodOption")
      .on("click", function () {
        $(this)
          .addClass("mapPeriodOptionSelected")
          .siblings()
          .removeClass("mapPeriodOptionSelected");
        selectedPeriod = $(this).data("period");

        switch (selectedPeriod) {
          case 2:
            selectPeriod(2);
            sessionStorage.setItem('selected_period', '2')
            break;
          case 3:
            selectPeriod(3);
            sessionStorage.setItem('selected_period', '3')
            break;
          default:
            console.log("default case initiated")
            selectPeriod(1);
            sessionStorage.setItem('selected_period', '1')
        }
      });

    // Add persons into the selector

    $.getJSON(config.api_server + "../getPersons"+languageSuffix+".json", {
      language: languageSuffix,
    })

      .fail(function (err) {
        $("#uiMapLPDPSelectPersonPanel").append(
          $("<div>", {
            id: "uiMapLPDPSelectPersonPanelError",
            text: accordingToLanguage("id001"), // id001 ΠΑΡΟΥΣΙΑΣΤΗΚΕ ΚΑΠΟΙΟ ΣΦΑΛΜΑ!
          })
        );
      })
      .done(function (data) {
        $.each(data.features, function (index, item) {
          let nameToDisplay = item.lastnames + " " + item.firstname;
          let $item = $("<div>", {
            class: "uiMapLPPDPersonItem",
            text: nameToDisplay,
            data: { index: index },
          });

          let periodsExists = "{}";
          if (item.residencePeriods != null) {
            periodsExists = item.residencePeriods.slice(1, -1).split(",");
          }

          // Add periods as data
          $item.data("period1", true);
          $item.data("period2", item.livedInCreteAfterWW2 ? true : false);
          // console.log("item.livedInCreteAfterWW2: "+item.livedInCreteAfterWW2);
          $item.data("period3", periodsExists.includes("3"));

          // Add periods as classes
          $item.addClass("period1");

          if (item.livedInCreteAfterWW2) {
            $item.addClass("period2");
          }

          if (periodsExists.includes("3")) {
            $item.addClass("period3");
          }

          /*
          let lastnames = "";
          if (item.lastnames != null) {
            lastnames = item.lastnames.join(", ");
          }

          let occupations = "";
          if (item.occupations != null) {
            occupations = item.occupations.join(", ");
          }

          let citizenships = "";
          if (item.citizenships != null) {
            citizenships = item.citizenships.join(", ");
          }
          */

          let period1residence = "";
          if (item.period1residence != null && item.period1residence != "[]" && !item.period1residence.includes("L")) {
            period1residence = JSON.parse(item.period1residence);
          }
          const dataMappings = {
            lastnames: "lastnames",
            firstname: "firstname",
            birth: ["birthDate", "birthLocation"],
            death: ["deathDate", "deathLocation"],
            citizenships: "citizenships",            
            period1residence: "period1residence",
            period2residence: "period2residence",
            period1residenceName: "period1residenceName",
            period2residenceName: "period2residenceName",
            occupations: "occupations",
            publicComments: "publicComments",
            relatedFamilies: "relatedFamilies",
          };

          Object.entries(dataMappings).forEach(([prop, dataAttr]) => {
            if (Array.isArray(dataAttr)) {
              const value = dataAttr.map((key) => item[key] || "").join(" ");
              $item.data(prop, value != " " ? value : "");
            } else {
              let value = item[dataAttr] || "";
              $item.data(prop, value);
            }
          });

          $("#uiMapLPDPPersonsList").append($item);
        });
      });

    // add the event listener to persons
    $("#uiMapLPDPPersonsList").on("click", ".uiMapLPPDPersonItem", function () {

      let lastnamesToDisplay = $(this).data("lastnames");
      let firstnameToDisplay = $(this).data("firstname");
      let index = $(this).data("index");
      let birthToDisplay = $(this).data("birth");
      let deathToDisplay = $(this).data("death");
      let citizenshipsToDisplay = $(this).data("citizenships");
      let occupationsToDisplay = $(this).data("occupations");
      if (sessionStorage.getItem("selected_period")== undefined) {
        sessionStorage.setItem("selected_period", "1")
      }
      let addressesToDisplay = $(this).data("period"+sessionStorage.getItem("selected_period")+"residenceName");
      let publicCommentsToDisplay = $(this).data("publicComments");
      let building_ids = $(this).data("period"+sessionStorage.getItem("selected_period")+"residence");
      let relationsToDisplay = $(this).data("relatedFamilies");
      console.log("relatedFamilies: "+relationsToDisplay);
      // console.log(sessionStorage.getItem("selected_period")+" building_ids: "+building_ids)

      $("#uiMapLPDPPersonalDataPanel").fadeIn();

      $(".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData").removeClass(
        "period1 period2 period3"
      );
      if ($(this).hasClass("period1")) {
        $(".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData").addClass(
          "period1"
        );
      }
      if ($(this).hasClass("period2")) {
        $(".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData").addClass(
          "period2"
        );
      }
      if ($(this).hasClass("period3")) {
        $(".uiMapPDPPPersonalDataPanelPersonDetailsFlexPersonData").addClass(
          "period3"
        );
      }

      function displayPersonalDetailsItem(subject, dataToDisplay) {
        $("#uiMapLP" + subject).text(dataToDisplay != "" ? dataToDisplay : "-");
      }

      function displayRelationsLink(subject, dataToDisplay) {
        const target = $("#uiMapLP" + subject);
        if (dataToDisplay) {
          let linksHTML = "";
    
          dataToDisplay.forEach(datum => {
            const url = `/indexRelations${languageSuffix}.html?selected=${encodeURIComponent(datum)}`;
            linksHTML += `<a href="${url}" target="_blank">${datum}</a><br>`;
            console.log("datum at displayRelationsLink:", datum);
          });
          target.html(linksHTML);
          console.log("dataToDisplay at displayRelationsLink: "+dataToDisplay);
        } else {
          target.text("-");
        }
      }

      displayPersonalDetailsItem("Lastnames", lastnamesToDisplay);
      displayPersonalDetailsItem("Firstname", firstnameToDisplay);
      displayPersonalDetailsItem("Birth", birthToDisplay);
      displayPersonalDetailsItem("Death", deathToDisplay);
      displayPersonalDetailsItem("Occupations", occupationsToDisplay);
      displayPersonalDetailsItem("Addresses", addressesToDisplay);
      displayPersonalDetailsItem("Citizenships", citizenshipsToDisplay);
      displayPersonalDetailsItem("PublicComments", publicCommentsToDisplay);
      displayRelationsLink("RelatedFamilies", relationsToDisplay);

      changeVisibilityAccordingToPeriod(
        $("#uiMapPeriodSelectorContainer .mapPeriodOptionSelected").data(
          "period"
        )
      );
      building_ids = JSON.parse(building_ids)
      for (let i = 0; i < building_ids.length; i++){
        if (!building_ids[i].includes("L")) {
          $("#"+building_ids[i]).css("filter", "invert(8%) sepia(100%) saturate(6639%) hue-rotate(1deg) brightness(128%) contrast(96%)");
          $("#"+building_ids[i]).css("z-index", "1");
        }
      }
    });

    // add the event listener to the X symbol of personal details
    $("#uiMapPDPPPersonalDataPanelPersonDetailsFlexClose").on(
      "click",
      function () {
        $("#uiMapLPDPPersonalDataPanel").fadeOut();
      }
    );

    // Add the buildings
    var selected_period = sessionStorage.getItem("selected_period")
    if (selected_period === null){
       selected_period = "1"
    }
    $(window).on("load", printBuildingsperPeriod(selected_period, map));

    // add the event listener to the buttons of period choosing
    $("#uiMapPeriodSelectorContainer").on("click", ".mapPeriodOption", function () {
      selected_period = sessionStorage.getItem("selected_period")
      printBuildingsperPeriod(selected_period, map)
    });

    // add the mapPeriodOptionSelected class to the selected class as per session stored variable
    $("#uiMapPeriodSelectorPeriod"+sessionStorage.getItem("selected_period"))
    .addClass("mapPeriodOptionSelected")

  } // Partly End of what happens when the current page is indexMap ----------------------------------

  // Manages the Relations' Graph --------------------------------------------------------------------

  if (currentPage === "indexRelations") {
    $('#uiMapLPSelectLastName').change(function() {
        var selectedOption = $(this).val();
        var id = $(this).find('option:selected').attr('id');
        $("#pdf").attr('src', "rsc/trees/"+selectedOption+".pdf");
    });        


    // Read query string parameters
    function getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    // On page load
    $(document).ready(function() {
      const selectedValue = getQueryParam("selected");
      if (selectedValue) {
        $("#uiMapLPSelectLastName").val(selectedValue); 
        $("#pdf").attr('src', "rsc/trees/"+selectedValue+".pdf");
      }
    });
  }
  // if (currentPage === "indexRelations") {
  //   $('#uiMapLPSelectLastName').change(function() {
  //       var id = $(this).find('option:selected').value();
  //       $("#pdf").attr('src', "rsc/trees/" + id + "_" + languageSuffix + ".pdf");
  //   });
  // }         

  // Partly End of what happens when the current page is indexRelations --------------------------------

  // End of what happens when the current page is either indexMap or indexRelations
}); // END
