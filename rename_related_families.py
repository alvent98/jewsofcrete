from json import load, dumps
import os
import shutil

with open('C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\getPersonsEL.json', 'r', encoding="utf8") as file:
    persons_el = load(file)
    file.close

with open('C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\getPersonsEN.json', 'r', encoding="utf8") as file:
    persons_en = load(file)
    file.close

new_buildings_1 = {"type": "FeatureCollection","features": []}
new_personsEN = {"type": "FeatureCollection","features": []}
new_personsEL = {"type": "FeatureCollection","features": []}

persons_features = persons_el["features"]
for person in persons_features:

    families = []
    lastname = ""
    for initial_lastname in person["relatedFamilies"]:
        if initial_lastname == "Αβιγαδές ή Αβιγαδώρ":
            lastname = "Αβιγαδές ή Αβιγαδώρ Τσελεπόν και Ντουντού"
        elif initial_lastname == "Άγγελ":
            lastname = "Άγγελ Αβραάμ και Άννα"
        elif initial_lastname == "Αλχανάτης":
            lastname = "Αλχανάτης Δαβίδ και [άγνωστη]"
        elif initial_lastname == "Αμάρ":
            lastname = "Αμάρ Μάρκος και Ελίζα"
        elif initial_lastname == "Ασαγιάς":
            lastname = "Ασαγιάς Μόρδο και Ρεγγίνα"
        elif initial_lastname == "Αττίας":
            lastname = "Αττίας Άγγελ και [άγνωστη]"
        elif initial_lastname == "Βεντούρας":
            lastname = "Βεντούρας Σαμουήλ και Βιολέτα"
        elif initial_lastname == "Γαμβάης ή Γκαμπάης":
            lastname = "Γαμβάης ή Γκαμπάης Χαΐμ και Ρόζα"
        elif initial_lastname == "Γανής ή Γκανής":
            lastname = "Γανής ή Γκανής Σαμουήλ και Ραχήλ"
        elif initial_lastname == "Γρασιάνος":
            lastname = "Γρασιάνος Μωυσής και [άγνωστη]"
        elif initial_lastname == "Δαλμέδικος":
            lastname = "Δαλμέδικος Βήττας και [άγνωστη]"
        elif initial_lastname == "Δεπάς":
            lastname = "Δεπάς ή Ντεπάς Μωυσής και Ραχήλ"
        elif initial_lastname == "Διέντες":
            lastname = "Διέντες Αβραάμ και Ντόλτσα"
        elif initial_lastname == "Εβλαγόν":
            lastname = "Εβλαγόν Δαβίδ και Καλομοίρα"
        elif initial_lastname == "Εσκεναζής":
            lastname = "Εσκεναζής Μεναχέμ και Σάρρα"
        elif initial_lastname == "Ελχάις1":
            lastname = "Ελχάις Ισαάκ και Ραχήλ"
        elif initial_lastname == "Ελχάις2":
            lastname = "Ελχάις Σαμπατών και [άγνωστη]"
        elif initial_lastname == "Ισαάκ":
            lastname = "Ισαάκ Ισαάκ και Χρυσάνθη"
        elif initial_lastname == "Ισχακής1":
            lastname = "Ισχακής Μάρκος και Χανά"
        elif initial_lastname == "Ισχακής2":
            lastname = "Ισχακής Δανιήλ και Ζαφείρα"
        elif initial_lastname == "Κοέν1":
            lastname = "Κοέν Σαούλ και Μπεχόρα"
        elif initial_lastname == "Κοέν2":
            lastname = "Κοέν Αβραάμ και Ρεβέκκα"
        elif initial_lastname == "Κοέν3":
            lastname = "Κοέν Γαβριήλ και Εσθήρ"
        elif initial_lastname == "Κοέν4":
            lastname = "Κοέν Αβραάμ και Μαλκά"
        elif initial_lastname == "Κοέν5":
            lastname = "Κοέν Ηλίας και Σιμχά"
        elif initial_lastname == "Κοέν6":
            lastname = "Κοέν Αλβέρτος και [άγνωστη]"
        elif initial_lastname == "Κοέν7":
            lastname = "Κοέν Σολομών και [άγνωστη]"
        elif initial_lastname == "Κοέν8":
            lastname = "Κοέν Χαΐμ και Ζενή"
        elif initial_lastname == "Κονέν":
            lastname = "Κονέν Σίμων και Ρόζα"
        elif initial_lastname == "Κωνσταντίνης":
            lastname = "Κωνσταντίνης Σαμουήλ και Μίριαμ"
        elif initial_lastname == "Λεβής1":
            lastname = "Λεβής Μάρκος και Αλέγρα"
        elif initial_lastname == "Λεβής2":
            lastname = "Λεβής Ιακώβ και Σουλτάνα"
        elif initial_lastname == "Λεβής3":
            lastname = "Λεβής Μωυσής και [άγνωστη]"
        elif initial_lastname == "Λεβής4":
            lastname = "Λεβής Γιοχανάς και Εσθήρ"
        elif initial_lastname == "Λεών":
            lastname = "Λεών Ισαάκ και Μπεχόρα"
        elif initial_lastname == "Ματαλόν":
            lastname = "Μανταλών Αβραάμ και Ρεβέκκα"
        elif initial_lastname == "Μινέρβος1":
            lastname = "Μινέρβος Χαΐμ και [άγνωστη]"
        elif initial_lastname == "Μινέρβος2":
            lastname = "Μινέρβος Ιωσήφ και Σιμχά"
        elif initial_lastname == "Μινέρβος3":
            lastname = "Μινέρβος Εδμόν και Ρεβέκκα"
        elif initial_lastname == "Μηνιωνής":
            lastname = "Μηνιωνής Σαμουήλ και Ντεβόρα"
        elif initial_lastname == "Μόλχος":
            lastname = "Μόλχος Σολομών και Στέλλα"
        elif initial_lastname == "Μόρδος1":
            lastname = "Μόρδος Μωυσής και Μαζαλτώφ"
        elif initial_lastname == "Μόρδος2":
            lastname = "Μόρδος Σαμουήλ και Στερίνα"
        elif initial_lastname == "Μουστάκης":
            lastname = "Μουστάκης Σάββας και Αλέγρα"
        elif initial_lastname == "Μπέτσικας":
            lastname = "Μπέτσικας Λεών και Χανά"
        elif initial_lastname == "Ναξών":
            lastname = "Ναξών Ισαάκ και Ρίκα"
        elif initial_lastname == "Όσμος1":
            lastname = "Όσμος Σολομών και [άγνωστη]"
        elif initial_lastname == "Όσμος2":
            lastname = "Όσμος Βίκτωρ Χαΐμ και [άγνωστη]"
        elif initial_lastname == "Παπουσάδος":
            lastname = "Παπουσάδος Μασλάχ και [άγνωστη]"
        elif initial_lastname == "Πίνχας":
            lastname = "Πίγχας Μωυσής και Σάρρα"
        elif initial_lastname == "Πολίτης":
            lastname = "Πολίτης Μάρκος και Ρεβέκκα"
        elif initial_lastname == "Ραφαήλ":
            lastname = "Ραφαήλ Μωυσής και Ευθυμία"
        elif initial_lastname == "Ρότεμπεργκ":
            lastname = "Ρότεμπεργκ Αβραάμ και [άγνωστη]"
        elif initial_lastname == "Σαλέμ Ισαάκ":
            lastname = "Σαλέμ Ισαάκ και [άγνωστη]"
        elif initial_lastname == "Σαλέμ Σολομών":
            lastname = "Σαλέμ Σολομών και [άγνωστη]"
        elif initial_lastname == "Σαλφατής Αβραάμ":
            lastname = "Σαλφατής Αβραάμ και [άγνωστη]"
        elif initial_lastname == "Σαλφατής Δαβίδ 1":
            lastname = "Σαλφατής Δαβίδ και [άγνωστη]"
        elif initial_lastname == "Σαλφατής Δαβίδ 2":
            lastname = "Σαλφατής Δαβίδ και Σάρρα"
        elif initial_lastname == "Σάρδας":
            lastname = "Σάρδας Ραφαήλ και [άγνωστη]"
        elif initial_lastname == "Σεζάνας":
            lastname = "Σεζάνας Ματαθίας και Ρεβέκκα"
        elif initial_lastname == "Σερένος":
            lastname = "Σερένος Σολομών και [άγνωστη]"
        elif initial_lastname == "Τρέβεζας":
            lastname = "Τρέβεζας Αβραάμ και Μαζαλτώφ"
        elif initial_lastname == "Φερμών":
            lastname = "Φερμών Μωυσής και [άγνωστη]"
        elif initial_lastname == "Φόρτης1":
            lastname = "Φόρτης Μωυσής και [άγνωστη]"
        elif initial_lastname == "Φόρτης2":
            lastname = "Φόρτης Σολομών και Πέρλα"
        elif initial_lastname == "Φόρτης3":
            lastname = "Φόρτης Σολομών και Άστρο"
        elif initial_lastname == "Φραγκής":
            lastname = "Φραγκής Ισαάκ και Ρεβέκκα"
        elif initial_lastname == "Φράγκος1":
            lastname = "Φράγκος Νισσήμ και [άγνωστη]"
        elif initial_lastname == "Φράγκος2":
            lastname = "Φράγκος Ραφαήλ και Αλέγρα"
        elif initial_lastname == "Φράγκος3":
            lastname = "Φράγκος Ιακώβ και Θάλεια"
        elif initial_lastname == "Φράγκος4":
            lastname = "Φράγκος Μάρκος και Εσθήρ"
        elif initial_lastname == "Φράγκος5":
            lastname = "Φράγκος Ιακώβ και Ρόζα"
        elif initial_lastname == "Φράγκος6":
            lastname = "Φράγκος Μάρκος και Ραχήλ"
        elif initial_lastname == "Φράγκος7":
            lastname = "Φράγκος Ισαάκ και [άγνωστη]"
        elif initial_lastname == "Φράγκος8":
            lastname = "Φράγκος Δαβίδ και [άγνωστη]"
        elif initial_lastname == "Χασκέλ":
            lastname = "Χασκέλ Ισαάκ και Ζαφείρα"
    
        families.append(lastname)
    person["relatedFamilies"] = families

new_personsEL["features"] = persons_features

with open("getPersonsEL_renamed.json", "w", encoding="utf8") as f:
    f.write(dumps(new_personsEL, indent=4, ensure_ascii=False))

persons_features = persons_en["features"]
for person in persons_features:

    families = []
    for initial_lastname in person["relatedFamilies"]:
        if initial_lastname == "Avigades Or Avigador":
            lastname = "Avigades or Avigador Tselepon and Doudou"
        elif initial_lastname == "Angel":
            lastname = "Angel Avraam and Anna"
        elif initial_lastname == "Alhanatis":
            lastname = "Alhanatis David and [unknown]"
        elif initial_lastname == "Amar":
            lastname = "Amar Markos and Eliza"
        elif initial_lastname == "Asayias":
            lastname = "Asayias Mordo and Regina"
        elif initial_lastname == "Attias":
            lastname = "Attias Angel and [unknown]"
        elif initial_lastname == "Ventouras":
            lastname = "Ventouras Samouil and Violeta"
        elif initial_lastname == "Gamvais or Gabais":
            lastname = "Gamvais or Gabais Haim and Roza"
        elif initial_lastname == "Ganis":
            lastname = "Ganis Samouil and Rahil"
        elif initial_lastname == "Graciano":
            lastname = "Grasianos Moisis and [unknown]"
        elif initial_lastname == "Dalmedikos":
            lastname = "Dalmedikos Vittas and [unknown]"
        elif initial_lastname == "Depas":
            lastname = "Depas Moisis and Rahil"
        elif initial_lastname == "Dientes":
            lastname = "Dientes Avraam and Doltsa"
        elif initial_lastname == "Evlagon":
            lastname = "Evlagon David and Kalomira"
        elif initial_lastname == "Eskenazis":
            lastname = "Eskenazis Menahem and Sarra"
        elif initial_lastname == "Elhais1":
            lastname = "Elhais Isaak and Rahil"
        elif initial_lastname == "Elhais2":
            lastname = "Elhais Sabaton and [unknown]"
        elif initial_lastname == "Isaak":
            lastname = "Isaak Isaak and Hrisanthi"
        elif initial_lastname == "Ishakis1":
            lastname = "Ishakis Markos and Hanna"
        elif initial_lastname == "Ishakis2":
            lastname = "Ishakis Daniil and Zafira"
        elif initial_lastname == "Koen1":
            lastname = "Koen Saoul and Behora"
        elif initial_lastname == "Koen2":
            lastname = "Koen Avraam and Revekka"
        elif initial_lastname == "Koen3":
            lastname = "Koen Gavriil and Esthir"
        elif initial_lastname == "Koen4":
            lastname = "Koen Avraam and Malka"
        elif initial_lastname == "Koen5":
            lastname = "Koen Ilias and Simha"
        elif initial_lastname == "Koen6":
            lastname = "Koen Alvertos and [unknown]"
        elif initial_lastname == "Koen7":
            lastname = "Koen Solomon and [unknown]"
        elif initial_lastname == "Koen8":
            lastname = "Koen Haim and Zeni"
        elif initial_lastname == "Konen":
            lastname = "Konen Simon and Roza"
        elif initial_lastname == "Konstantinis":
            lastname = "Konstantinis Samouil and Miriam"
        elif initial_lastname == "Levis1":
            lastname = "Levis Markos and Alegra"
        elif initial_lastname == "Levis2":
            lastname = "Levis Iakov and Soultana"
        elif initial_lastname == "Levis3":
            lastname = "Levis Moisis and [unknown]"
        elif initial_lastname == "Levis4":
            lastname = "Levis Yiohanas and Esthir"
        elif initial_lastname == "Leon":
            lastname = "Leon Isaak and Behora"
        elif initial_lastname == "Matalon":
            lastname = "Mandalon Avraam and Revekka"
        elif initial_lastname == "Minervos1":
            lastname = "Minervos Haim and [unknown]"
        elif initial_lastname == "Minervos2":
            lastname = "Minervos Iosif and Simha"
        elif initial_lastname == "Minervos3":
            lastname = "Minervos Edmon and Rebekka"
        elif initial_lastname == "Minionis":
            lastname = "Minionis Samouil and Devora"
        elif initial_lastname == "Molhos":
            lastname = "Molhos Solomon and Stella"
        elif initial_lastname == "Mordos1":
            lastname = "Mordos Moisis and Mazaltof"
        elif initial_lastname == "Mordos2":
            lastname = "Mordos Samouil and Sterina"
        elif initial_lastname == "Moustakis":
            lastname = "Moustakis Savvas and Alegra"
        elif initial_lastname == "Betsikas":
            lastname = "Betsikas Leon and Hanna"
        elif initial_lastname == "Naxon":
            lastname = "Naxon Isaak and Rika"
        elif initial_lastname == "Osmos1":
            lastname = "Osmos Solomon and [unknown]"
        elif initial_lastname == "Osmos2":
            lastname = "Osmos Viktor Haim and [unknown]"
        elif initial_lastname == "Papousados":
            lastname = "Papousados Maslah and [unknown]"
        elif initial_lastname == "Pinhas":
            lastname = "Pinhas Moisis and Sarra"
        elif initial_lastname == "Politis":
            lastname = "Politis Markos and Revekka"
        elif initial_lastname == "Rafail":
            lastname = "Rafail Moisis and Efthimia"
        elif initial_lastname == "Rotemberg":
            lastname = "Rotemverg Avraam and [unknown]"
        elif initial_lastname == "Salem Isaak":
            lastname = "Salem Isaak and [unknown]"
        elif initial_lastname == "Salem Solomon":
            lastname = "Salem Solomon and [unknown]"
        elif initial_lastname == "Salfatis Avraam":
            lastname = "Salfatis Avraam and [unknown]"
        elif initial_lastname == "Salfatis David 1":
            lastname = "Salfatis David and [unknown]"
        elif initial_lastname == "Salfatis David 2":
            lastname = "Salfatis David and Sarra"
        elif initial_lastname == "Sardas":
            lastname = "Sardas Rafail and [unknown]"
        elif initial_lastname == "Sezanas":
            lastname = "Sezanas Matathias and Revekka"
        elif initial_lastname == "Serenos":
            lastname = "Serenas Solomon and [unknown]"
        elif initial_lastname == "Trevezas":
            lastname = "Trevezas Avraam and Mazaltof"
        elif initial_lastname == "Fermon":
            lastname = "Fermon Moisis and [unknown]"
        elif initial_lastname == "Fortis1":
            lastname = "Fortis Moisis and [unknown]"
        elif initial_lastname == "Fortis2":
            lastname = "Fortis Solomon and Perla"
        elif initial_lastname == "Fortis3":
            lastname = "Fortis Solomon and Astro"
        elif initial_lastname == "Frangis":
            lastname = "Frangis Isaak and Revekka"
        elif initial_lastname == "Frangos1":
            lastname = "Frangos Nissim and [unknown]"
        elif initial_lastname == "Frangos2":
            lastname = "Frangos Rafail and Alegra"
        elif initial_lastname == "Frangos3":
            lastname = "Frangos Iakov and Thalia"
        elif initial_lastname == "Frangos4":
            lastname = "Frangos Markos and Esthir"
        elif initial_lastname == "Frangos5":
            lastname = "Frangos Iakov and Roza"
        elif initial_lastname == "Frangos6":
            lastname = "Frangos Markos and Rahil"
        elif initial_lastname == "Frangos7":
            lastname = "Frangos Isaak and [unknown]"
        elif initial_lastname == "Frangos8":
            lastname = "Frangos David and [unknown]"
        elif initial_lastname == "Haskel":
            lastname = "Haskel Isaak and Zafira"

        families.append(lastname)
    person["relatedFamilies"] = families

new_personsEN["features"] = persons_features

with open("getPersonsEN_renamed.json", "w", encoding="utf8") as f:
    f.write(dumps(new_personsEN, indent=4, ensure_ascii=False))


# --- mapping (example, you can paste the full one we generated above) ---
rename_map = {
    "Avigades Or Avigador": "Avigades or Avigador Tselepon and Doudou",
    "Angel": "Angel Avraam and Anna",
    "Alhanatis": "Alhanatis David and [unknown]",
    "Amar": "Amar Markos and Eliza",
    "Asayias": "Asayias Mordo and Regina",
    "Attias": "Attias Angel and [unknown]",
    "Ventouras": "Ventouras Samouil and Violeta",
    "Gamvais or Gabais": "Gamvais or Gabais Haim and Roza",
    "Ganis": "Ganis Samouil and Rahil",
    "Graciano": "Grasianos Moisis and [unknown]",
    "Dalmedikos": "Dalmedikos Vittas and [unknown]",
    "Depas": "Depas Moisis and Rahil",
    "Dientes": "Dientes Avraam and Doltsa",
    "Evlagon": "Evlagon David and Kalomira",
    "Eskenazis": "Eskenazis Menahem and Sarra",
    "Elhais1": "Elhais Isaak and Rahil",
    "Elhais2": "Elhais Sabaton and [unknown]",
    "Isaak": "Isaak Isaak and Hrisanthi",
    "Ishakis1": "Ishakis Markos and Hanna",
    "Ishakis2": "Ishakis Daniil and Zafira",
    "Koen1": "Koen Saoul and Behora",
    "Koen2": "Koen Avraam and Revekka",
    "Koen3": "Koen Gavriil and Esthir",
    "Koen4": "Koen Avraam and Malka",
    "Koen5": "Koen Ilias and Simha",
    "Koen6": "Koen Alvertos and [unknown]",
    "Koen7": "Koen Solomon and [unknown]",
    "Koen8": "Koen Haim and Zeni",
    "Konen": "Konen Simon and Roza",
    "Konstantinis": "Konstantinis Samouil and Miriam",
    "Levis1": "Levis Markos and Alegra",
    "Levis2": "Levis Iakov and Soultana",
    "Levis3": "Levis Moisis and [unknown]",
    "Levis4": "Levis Yiohanas and Esthir",
    "Leon": "Leon Isaak and Behora",
    "Matalon": "Mandalon Avraam and Revekka",
    "Minervos1": "Minervos Haim and [unknown]",
    "Minervos2": "Minervos Iosif and Simha",
    "Minervos3": "Minervos Edmon and Rebekka",
    "Minionis": "Minionis Samouil and Devora",
    "Molhos": "Molhos Solomon and Stella",
    "Mordos1": "Mordos Moisis and Mazaltof",
    "Mordos2": "Mordos Samouil and Sterina",
    "Moustakis": "Moustakis Savvas and Alegra",
    "Betsikas": "Betsikas Leon and Hanna",
    "Naxon": "Naxon Isaak and Rika",
    "Osmos1": "Osmos Solomon and [unknown]",
    "Osmos2": "Osmos Viktor Haim and [unknown]",
    "Papousados": "Papousados Maslah and [unknown]",
    "Pinhas": "Pinhas Moisis and Sarra",
    "Politis": "Politis Markos and Revekka",
    "Rafail": "Rafail Moisis and Efthimia",
    "Rotemberg": "Rotemverg Avraam and [unknown]",
    "Salem Isaak": "Salem Isaak and [unknown]",
    "Salem Solomon": "Salem Solomon and [unknown]",
    "Salfatis Avraam": "Salfatis Avraam and [unknown]",
    "Salfatis David 1": "Salfatis David and [unknown]",
    "Salfatis David 2": "Salfatis David and Sarra",
    "Sardas": "Sardas Rafail and [unknown]",
    "Sezanas": "Sezanas Matathias and Revekka",
    "Serenos": "Serenas Solomon and [unknown]",
    "Soulhamis": "Soulhamis Savvas and Simha",
    "Trevezas": "Trevezas Avraam and Mazaltof",
    "Fermon": "Fermon Moisis and [unknown]",
    "Fortis1": "Fortis Moisis and [unknown]",
    "Fortis2": "Fortis Solomon and Perla",
    "Fortis3": "Fortis Solomon and Astro",
    "Frangis": "Frangis Isaak and Revekka",
    "Frangos1": "Frangos Nissim and [unknown]",
    "Frangos2": "Frangos Rafail and Alegra",
    "Frangos3": "Frangos Iakov and Thalia",
    "Frangos4": "Frangos Markos and Esthir",
    "Frangos5": "Frangos Iakov and Roza",
    "Frangos6": "Frangos Markos and Rahil",
    "Frangos7": "Frangos Isaak and [unknown]",
    "Frangos8": "Frangos David and [unknown]",
    "Haskel": "Haskel Isaak and Zafira",
    "Hanen": "Hanen Avraam and Sarina",
}

# --- configuration ---
source_folder = "C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\rsc\\trees"          # folder where your original PDFs are
target_folder = "renamed_pdfs"  # new folder for renamed PDFs

# create target folder if not exists
os.makedirs(target_folder, exist_ok=True)

print("Renaming PDFs... for EN")

# go through all pdfs in the folder
for filename in os.listdir(source_folder):
    if filename.lower().endswith(".pdf"):
        base_name = os.path.splitext(filename)[0]  # e.g. "Koen1"
        if base_name in rename_map:
            new_name = rename_map[base_name] + ".pdf"
            src = os.path.join(source_folder, filename)
            dst = os.path.join(target_folder, new_name)
            shutil.copy2(src, dst)
            print(f"Renamed: {filename} -> {new_name}")
        else:
            print(f"⚠️ No mapping found for: {base_name}")


rename_map = {
    "Αβιγαδές ή Αβιγαδώρ": "Αβιγαδές ή Αβιγαδώρ Τσελεπόν και Ντουντού",
    "Άγγελ": "Άγγελ Αβραάμ και Άννα",
    "Αλχανάτης": "Αλχανάτης Δαβίδ και [άγνωστη]",
    "Αμάρ": "Αμάρ Μάρκος και Ελίζα",
    "Ασαγιάς": "Ασαγιάς Μόρδο και Ρεγγίνα",
    "Αττίας": "Αττίας Άγγελ και [άγνωστη]",
    "Βεντούρας": "Βεντούρας Σαμουήλ και Βιολέτα",
    "Γαμβάης ή Γκαμπάης": "Γαμβάης ή Γκαμπάης Χαΐμ και Ρόζα",
    "Γανής ή Γκανής": "Γανής ή Γκανής Σαμουήλ και Ραχήλ",
    "Γρασιάνος": "Γρασιάνος Μωυσής και [άγνωστη]",
    "Δαλμέδικος": "Δαλμέδικος Βήττας και [άγνωστη]",
    "Δεπάς": "Δεπάς ή Ντεπάς Μωυσής και Ραχήλ",
    "Διέντες": "Διέντες Αβραάμ και Ντόλτσα",
    "Εβλαγόν": "Εβλαγόν Δαβίδ και Καλομοίρα",
    "Εσκεναζής": "Εσκεναζής Μεναχέμ και Σάρρα",
    "Ελχάις1": "Ελχάις Ισαάκ και Ραχήλ",
    "Ελχάις2": "Ελχάις Σαμπατών και [άγνωστη]",
    "Ισαάκ": "Ισαάκ Ισαάκ και Χρυσάνθη",
    "Ισχακής1": "Ισχακής Μάρκος και Χανά",
    "Ισχακής2": "Ισχακής Δανιήλ και Ζαφείρα",
    "Κοέν1": "Κοέν Σαούλ και Μπεχόρα",
    "Κοέν2": "Κοέν Αβραάμ και Ρεβέκκα",
    "Κοέν3": "Κοέν Γαβριήλ και Εσθήρ",
    "Κοέν4": "Κοέν Αβραάμ και Μαλκά",
    "Κοέν5": "Κοέν Ηλίας και Σιμχά",
    "Κοέν6": "Κοέν Αλβέρτος και [άγνωστη]",
    "Κοέν7": "Κοέν Σολομών και [άγνωστη]",
    "Κοέν8": "Κοέν Χαΐμ και Ζενή",
    "Κονέν": "Κονέν Σίμων και Ρόζα",
    "Κωνσταντίνης": "Κωνσταντίνης Σαμουήλ και Μίριαμ",
    "Λεβής1": "Λεβής Μάρκος και Αλέγρα",
    "Λεβής2": "Λεβής Ιακώβ και Σουλτάνα",
    "Λεβής3": "Λεβής Μωυσής και [άγνωστη]",
    "Λεβής4": "Λεβής Γιοχανάς και Εσθήρ",
    "Λεών": "Λεών Ισαάκ και Μπεχόρα",
    "Ματαλόν": "Μανταλών Αβραάμ και Ρεβέκκα",
    "Μινέρβος1": "Μινέρβος Χαΐμ και [άγνωστη]",
    "Μινέρβος2": "Μινέρβος Ιωσήφ και Σιμχά",
    "Μινέρβος3": "Μινέρβος Εδμόν και Ρεβέκκα",
    "Μηνιωνής": "Μηνιωνής Σαμουήλ και Ντεβόρα",
    "Μόλχος": "Μόλχος Σολομών και Στέλλα",
    "Μόρδος1": "Μόρδος Μωυσής και Μαζαλτώφ",
    "Μόρδος2": "Μόρδος Σαμουήλ και Στερίνα",
    "Μουστάκης": "Μουστάκης Σάββας και Αλέγρα",
    "Μπέτσικας": "Μπέτσικας Λεών και Χανά",
    "Ναξών": "Ναξών Ισαάκ και Ρίκα",
    "Όσμος1": "Όσμος Σολομών και [άγνωστη]",
    "Όσμος2": "Όσμος Βίκτωρ Χαΐμ και [άγνωστη]",
    "Παπουσάδος": "Παπουσάδος Μασλάχ και [άγνωστη]",
    "Πίνχας": "Πίγχας Μωυσής και Σάρρα",
    "Πολίτης": "Πολίτης Μάρκος και Ρεβέκκα",
    "Ραφαήλ": "Ραφαήλ Μωυσής και Ευθυμία",
    "Ρότεμπεργκ": "Ρότεμπεργκ Αβραάμ και [άγνωστη]",
    "Σαλέμ Ισαάκ": "Σαλέμ Ισαάκ και [άγνωστη]",
    "Σαλέμ Σολομών": "Σαλέμ Σολομών και [άγνωστη]",
    "Σαλφατής Αβραάμ": "Σαλφατής Αβραάμ και [άγνωστη]",
    "Σαλφατής Δαβίδ 1": "Σαλφατής Δαβίδ και [άγνωστη]",
    "Σαλφατής Δαβίδ 2": "Σαλφατής Δαβίδ και Σάρρα",
    "Σάρδας": "Σάρδας Ραφαήλ και [άγνωστη]",
    "Σεζάνας": "Σεζάνας Ματαθίας και Ρεβέκκα",
    "Σερένος": "Σερένος Σολομών και [άγνωστη]",
    "Τρέβεζας": "Τρέβεζας Αβραάμ και Μαζαλτώφ",
    "Φερμών": "Φερμών Μωυσής και [άγνωστη]",
    "Φόρτης1": "Φόρτης Μωυσής και [άγνωστη]",
    "Φόρτης2": "Φόρτης Σολομών και Πέρλα",
    "Φόρτης3": "Φόρτης Σολομών και Άστρο",
    "Φραγκής": "Φραγκής Ισαάκ και Ρεβέκκα",
    "Φράγκος1": "Φράγκος Νισσήμ και [άγνωστη]",
    "Φράγκος2": "Φράγκος Ραφαήλ και Αλέγρα",
    "Φράγκος3": "Φράγκος Ιακώβ και Θάλεια",
    "Φράγκος4": "Φράγκος Μάρκος και Εσθήρ",
    "Φράγκος5": "Φράγκος Ιακώβ και Ρόζα",
    "Φράγκος6": "Φράγκος Μάρκος και Ραχήλ",
    "Φράγκος7": "Φράγκος Ισαάκ και [άγνωστη]",
    "Φράγκος8": "Φράγκος Δαβίδ και [άγνωστη]",
    "Χασκέλ": "Χασκέλ Ισαάκ και Ζαφείρα",
}

# --- configuration ---
source_folder = "C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\rsc\\trees\\gr"         # folder where your original PDFs are
target_folder = "renamed_pdfs_gr"  # new folder for renamed PDFs


print("Renaming PDFs... for EL")

# create target folder if not exists
os.makedirs(target_folder, exist_ok=True)

# go through all pdfs in the folder
for filename in os.listdir(source_folder):
    if filename.lower().endswith(".pdf"):
        base_name = os.path.splitext(filename)[0]  # e.g. "Koen1"
        if base_name in rename_map:
            new_name = rename_map[base_name] + ".pdf"
            src = os.path.join(source_folder, filename)
            dst = os.path.join(target_folder, new_name)
            shutil.copy2(src, dst)
            print(f"Renamed: {filename} -> {new_name}")
        else:
            print(f"⚠️ No mapping found for: {base_name}")



"""Αβιγαδές ή Αβιγαδώρ Τσελεπόν και Ντουντού
Άγγελ Αβραάμ και Άννα      
Αλχανάτης Δαβίδ και [άγνωστη]
Αμάρ Μάρκος και Ελίζα                                                          
Ασαγιάς Μόρδο και Ρεγγίνα
Αττίας Άγγελ και [άγνωστη]            
Βεντούρας Σαμουήλ και Βιολέτα   
Γαμβάης ή Γκαμπάης Χαΐμ και Ρόζα     
Γανής ή Γκανής Σαμουήλ και Ραχήλ 
Γρασιάνος Μωυσής και [άγνωστη]   
Δαλμέδικος Βήττας και [άγνωστη]  
Δεπάς ή Ντεπάς Μωυσής και Ραχήλ 
Διέντες Αβραάμ και Ντόλτσα
Εβλαγόν Δαβίδ και Καλομοίρα
Εσκεναζής Μεναχέμ και Σάρρα
Ελχάις Ισαάκ και Ραχήλ
Ελχάις Σαμπατών και [άγνωστη]       
Ισαάκ Ισαάκ και Χρυσάνθη
Ισχακής Μάρκος και Χανά
Ισχακής Δανιήλ και Ζαφείρα
Κοέν Σαούλ και Μπεχόρα
Κοέν Αβραάμ και Ρεβέκκα
Κοέν Γαβριήλ και Εσθήρ
Κοέν Αβραάμ και Μαλκά
Κοέν Ηλίας και Σιμχά
Κοέν Αλβέρτος και [άγνωστη]
Κοέν Σολομών και [άγνωστη]
Κοέν Χαΐμ και Ζενή
Κονέν Σίμων και Ρόζα
Κωνσταντίνης Σαμουήλ και Μίριαμ
Λεβής Μάρκος και Αλέγρα
Λεβής Ιακώβ και Σουλτάνα
Λεβής Μωυσής και [άγνωστη]
Λεβής Γιοχανάς και Εσθήρ
Λεών Ισαάκ και Μπεχόρα
Μανταλών Αβραάμ και Ρεβέκκα
Μινέρβος Χαΐμ και [άγνωστη]
Μινέρβος Ιωσήφ και Σιμχά
Μινέρβος Εδμόν και Ρεβέκκα
Μηνιωνής Σαμουήλ και Ντεβόρα
Μόλχος Σολομών και Στέλλα
Μόρδος Μωυσής και Μαζαλτώφ
Μόρδος Σαμουήλ και Στερίνα
Μουστάκης Σάββας και Αλέγρα
Μπέτσικας Λεών και Χανά
Ναξών Ισαάκ και Ρίκα
Όσμος Σολομών και [άγνωστη]
Όσμος Βίκτωρ Χαΐμ και [άγνωστη]
Παπουσάδος Μασλάχ και [άγνωστη]
Πίγχας Μωυσής και Σάρρα
Πολίτης Μάρκος και Ρεβέκκα
Ραφαήλ Μωυσής και Ευθυμία
Ρότεμπεργκ Αβραάμ και [άγνωστη]
Σαλέμ Ισαάκ και [άγνωστη]
Σαλέμ Σολομών και [άγνωστη]
Σαλφατής Αβραάμ και [άγνωστη]
Σαλφατής Δαβίδ και [άγνωστη]
Σαλφατής Δαβίδ και Σάρρα
Σάρδας Ραφαήλ και [άγνωστη]
Σεζάνας Ματαθίας και Ρεβέκκα
Σερένος Σολομών και [άγνωστη]
Τρέβεζας Αβραάμ και Μαζαλτώφ
Φερμών Μωυσής και [άγνωστη]
Φόρτης Μωυσής και [άγνωστη]
Φόρτης Σολομών και Πέρλα
Φόρτης Σολομών και Άστρο
Φραγκής Ισαάκ και Ρεβέκκα
Φράγκος Νισσήμ και [άγνωστη]
Φράγκος Ραφαήλ και Αλέγρα
Φράγκος Ιακώβ και Θάλεια
Φράγκος Μάρκος και Εσθήρ
Φράγκος Ιακώβ και Ρόζα
Φράγκος Μάρκος και Ραχήλ                            
Φράγκος Ισαάκ και [άγνωστη]                                
Φράγκος Δαβίδ και [άγνωστη]    
Χασκέλ Ισαάκ και Ζαφείρα

Avigades or Avigador Tselepon and Doudou
Angel Avraam and Anna
Alhanatis David and [unknown]
Amar Markos and Eliza
Asayias Mordo and Regina
Attias Angel and [unknown]
Ventouras Samouil and Violeta
Gamvais or Gabais Haim and Roza
Ganis Samouil and Rahil
Grasianos Moisis and [unknown]
Dalmedikos Vittas and [unknown]
Depas Moisis and Rahil
Dientes Avraam and Doltsa     
Evlagon David and Kalomira
Eskenazis Menahem and Sarra
Elhais Isaak and Rahil
Elhais Sabaton and [unknown]
Isaak Isaak and Hrisanthi
Ishakis Markos and Hanna
Ishakis Daniil and Zafira
Koen Saoul and Behora
Koen Avraam and Revekka
Koen Gavriil and Esthir
Koen Avraam and Malka
Koen Ilias and Simha
Koen Alvertos and [unknown]
Koen Solomon and [unknown]
Koen Haim and Zeni
Konen Simon and Roza
Konstantinis Samouil and Miriam
Levis Markos and Alegra
Levis Iakov and Soultana
Levis Moisis and [unknown]
Levis Yiohanas and Esthir
Leon Isaak and Behora
Mandalon Avraam and Revekka
Minervos Haim and [unknown]
Minervos Iosif and Simha
Minervos Edmon and Rebekka
Minionis Samouil and Devora
Molhos Solomon and Stella
Mordos Moisis and Mazaltof
Mordos Samouil and Sterina
Moustakis Savvas and Alegra
Betsikas Leon and Hanna
Naxon Isaak and Rika
Osmos Solomon and [unknown]
Osmos Viktor Haim and [unknown]
Papousados Maslah and [unknown]
Pinhas Moisis and Sarra
Politis Markos and Revekka
Rafail Moisis and Efthimia
Rotemverg Avraam and [unknown]
Salem Isaak and [unknown]
Salem Solomon and [unknown]
Salfatis Avraam and [unknown]
Salfatis David and [unknown]
Salfatis David and Sarra
Sardas Rafail and [unknown]
Sezanas Matathias and Revekka
Serenas Solomon and [unknown]
Serenas Avraam and [unknown]
Soulhamis Savvas and Simha
Trevezas Avraam and Mazaltof
Fermon Moisis and [unknown]
Fortis Moisis and [unknown]
Fortis Solomon and Perla
Fortis Solomon and Astro
Frangis Isaak and Revekka
Frangos Nissim and [unknown]
Frangos Rafail and Alegra
Frangos Iakov and Thalia
Frangos Markos and Esthir
Frangos Iakov and Roza
Frangos Markos and Rahil
Frangos Isaak and [unknown]
Frangos David and [unknown]
Haskel Isaak and Zafira
Hanen Avraam and Sarina"""